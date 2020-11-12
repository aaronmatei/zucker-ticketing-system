import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError, NotFoundError } from "@arzuckertickets/common";
import { Ticket } from "./../models/Ticket";

const getTickets = async (req: Request, res: Response, next: NextFunction) => {
    const tickets = await Ticket.find({});
    res.status(200).json({
        tickets,
    });
};

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
        .then((savedTicket) => { })
        .catch((err) => { });
    res.status(201).json({
        ticket: newTicket,
    });
};

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

const editTicket = async (req: Request, res: Response, next: NextFunction) => {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
        throw new NotFoundError();
    }

    if (ticket.userId !== req.currentUser!.id) {
        throw new NotAuthorizedError()

    }

    ticket.set({
        title: req.body.title,
        price: req.body.price
    })

    await ticket.save()

    res.status(200).json({
        ticket,
    });
};

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
    res.status(200).json({
        ticket,
    });
};

export { createTicket, getTicket, getTickets, editTicket, deleteTicket };
