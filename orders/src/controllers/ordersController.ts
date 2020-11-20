import { Request, Response, NextFunction } from "express";

import {
    NotFoundError,
    NotAuthorizedError,
    OrderStatus,
    BadRequestError,
} from "@arzuckertickets/common";
import { Order } from "./../models/Order";
import { Ticket } from "./../models/Ticket";
// events
import { OrderCreatedPublisher } from "./../events/publishers/order-created-publisher";
import { OrderCancelledPublisher } from "./../events/publishers/order-cancelled-publisher";


import { natsWrapper } from "./../nats-wrapper";
import mongoose from "mongoose";

const EXPIRATION_WINDOW_SECONDS = 15 * 60;

// GET tickets
const getOrders = async (req: Request, res: Response, next: NextFunction) => {
    const orders = await Order.find({
        userId: req.currentUser!.id,
    }).populate("ticket");
    res.status(200).json({
        orders,
    });
};

// create Ticket
const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    //find ticket to order
    const { ticketId } = req.body;
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
        throw new NotFoundError();
    }
    //check if it is reserved
    const isReserved = await ticket.isReserved();
    if (isReserved) {
        throw new BadRequestError("Ticket already reserved");
    }
    //calculate expiration time
    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);
    //build order and save it to db
    const newOrder = Order.build({
        userId: req.currentUser!.id,
        status: OrderStatus.Created,
        expiresAt: expiration,
        ticket: ticket,
    });
    await newOrder
        .save()
        .then((savedOrder) => {
            console.log("SAVED ORDER", savedOrder);
            new OrderCreatedPublisher(natsWrapper.client).publish({
                id: savedOrder.id,
                version: savedOrder.version,
                userId: savedOrder.userId,
                status: savedOrder.status,
                expiresAt: savedOrder.expiresAt.toISOString(),
                ticket: {
                    id: savedOrder.ticket.id,
                    price: savedOrder.ticket.price
                }
            })
        })
        .catch((err) => {
            console.log("ERROR IN SAVING ORDER", err);
        });
    //publish event of order created
};

// get Single Ticket
const getOrder = async (req: Request, res: Response, next: NextFunction) => {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
        throw new NotFoundError();

        // res.status(404).json({
        //     errors: [{ message: "ticket not found" }]
        // })
    }
    if (order.userId !== req.currentUser!.id) {
        throw new NotAuthorizedError();
    }
    res.status(200).json({
        order,
    });
};

// delete ticket

const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
        throw new NotFoundError();
    }
    if (order.userId !== req.currentUser!.id) {
        throw new NotAuthorizedError();
    }
    order.status = OrderStatus.Cancelled;
    await order.save().then(cancelledOrder => {
        new OrderCancelledPublisher(natsWrapper.client).publish({
            id: cancelledOrder.id,
            version: cancelledOrder.version,
            ticket: {
                id: cancelledOrder.ticket.id,
                price: cancelledOrder.ticket.price
            }
        })
    });
    res.status(204).json({
        order,
        message: "Order has been cancelled",
    });
};

export { createOrder, getOrder, getOrders, deleteOrder };
