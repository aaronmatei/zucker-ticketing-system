import { Request, Response, NextFunction } from "express";
import {
    NotFoundError,
    NotAuthorizedError,
    BadRequestError,
} from "@arzuckertickets/common";
import { Ticket } from "./../models/Ticket";
import { TicketCreatedPublisher } from "./../events/publishers/ticket-created-publisher";
import { TicketUpdatedPublisher } from "./../events/publishers/ticket-updated-publisher";
import { TicketDeletedPublisher } from "./../events/publishers/ticket-deleted-publisher";
import { natsWrapper } from "./../nats-wrapper";
import mongoose from "mongoose";

// GET - get tickets
const getTickets = async (req: Request, res: Response, next: NextFunction) => {
    const tickets = await Ticket.find({});
    res.status(200).json({
        tickets,
    });
};

// POST - create Ticket
const createTicket = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { title, price } = req.body;
    const newTicket = Ticket.build({
        title,
        price,
        userId: req.currentUser!.id,
    });

    await newTicket
        .save()
        .then((savedTicket) => {
            new TicketCreatedPublisher(natsWrapper.client).publish({
                id: savedTicket.id,
                title: savedTicket.title,
                price: savedTicket.price,
                userId: savedTicket.userId,
                version: savedTicket.version,
            });
            res.status(201).json({
                ticket: savedTicket,
            });
        })
        .catch((err) => {
            console.log("ERROR SAVING TICKET", err);
            throw new Error(err.message);
        });
};

// GET - Single Ticket
const getTicket = async (req: Request, res: Response, next: NextFunction) => {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
        throw new NotFoundError();

        // res.status(404).json({
        //     errors: [{ message: "ticket not found" }]
        // })
    }
    res.status(200).json({
        ticket,
    });
};

// PUT - edit or update ticket

const editTicket = async (req: Request, res: Response, next: NextFunction) => {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
        throw new NotFoundError();
    }
    if (ticket.orderId) {
        throw new BadRequestError("Ticket is reserved");
    }

    if (ticket.userId !== req.currentUser!.id) {
        throw new NotAuthorizedError();
    }

    ticket.set({
        title: req.body.title,
        price: req.body.price,
    });

    await ticket.save().then((savedTicket) => {
        new TicketUpdatedPublisher(natsWrapper.client).publish({
            id: savedTicket.id,
            title: savedTicket.title,
            price: savedTicket.price,
            userId: savedTicket.userId,
            version: savedTicket.version,
        });
        res.status(200).json({
            updatedTicket: ticket,
        });
    });
};

// DELETE - delete ticket
const deleteTicket = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
        throw new NotFoundError();

        // res.status(404).json({
        //     errors: [{ message: "ticket not found" }]
        // })
    }

    await Ticket.findByIdAndDelete(ticket.id, function (err: Error) {
        if (err) {
            console.log("ERROR IN DELETING", err);
        }
        new TicketDeletedPublisher(natsWrapper.client).publish({
            id: ticket.id,
            title: ticket.title,
            price: ticket.price,
            userId: ticket.userId,
        });
        res.status(200).json({
            ticketDeleted: ticket,
            message: "Ticket deleted successfully",
        });
    });
};

export { createTicket, getTicket, getTickets, editTicket, deleteTicket };
