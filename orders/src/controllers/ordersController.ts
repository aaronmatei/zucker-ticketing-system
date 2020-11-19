import { Request, Response, NextFunction } from "express";
import {
    NotFoundError,
    NotAuthorizedError,
    OrderStatus,
    BadRequestError,
} from "@arzuckertickets/common";
import { Order } from "./../models/Order";
import { Ticket } from "./../models/Ticket";
// import { TicketCreatedPublisher } from "./../events/publishers/ticket-created-publisher";
// import { TicketUpdatedPublisher } from "./../events/publishers/ticket-updated-publisher";
// import { TicketDeletedPublisher } from "./../events/publishers/ticket-deleted-publisher";
import { natsWrapper } from "./../nats-wrapper";
import mongoose from "mongoose";

const EXPIRATION_WINDOW_SECONDS = 15 * 60;

// GET tickets
const getOrders = async (req: Request, res: Response, next: NextFunction) => {
    const orders = await Order.find({
        userId: req.currentUser!.id
    }).populate('ticket')
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
    if ()
        res.status(200).json({
            order,
        });
};

// delete ticket

const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
    const order = "";
    if (!order) {
        throw new NotFoundError();

        // res.status(404).json({
        //     errors: [{ message: "ticket not found" }]
        // })
    }
};

export { createOrder, getOrder, getOrders, deleteOrder };
