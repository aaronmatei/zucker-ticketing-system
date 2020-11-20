import { Listener, OrderCancelledEvent, Subjects } from "@arzuckertickets/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/Ticket";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";
import { queueGroupName } from './queueGroupName';


export class OrderCancelledListener extends Listener<OrderCancelledEvent>{
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
    queueGroupName = queueGroupName;
    async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
        const ticket = await Ticket.findById(data.ticket.id);
        if (!ticket) {
            throw new Error("Ticket not found");
        }
        ticket.set({ orderId: undefined })
        await ticket.save().then(savedTicket => {
            new TicketUpdatedPublisher(this.client).publish({
                id: savedTicket.id,
                version: savedTicket.version,
                title: savedTicket.title,
                price: savedTicket.price,
                userId: savedTicket.userId,
                orderId: savedTicket.orderId,
            })
        })

        msg.ack();

    }
}