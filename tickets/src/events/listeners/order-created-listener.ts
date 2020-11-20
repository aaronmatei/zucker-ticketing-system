import { Listener, OrderCreatedEvent, Subjects } from "@arzuckertickets/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/Ticket";
import { queueGroupName } from "./queueGroupName";
import { TicketUpdatedPublisher } from "./../publishers/ticket-updated-publisher";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
    queueGroupName = queueGroupName;
    async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
        // find ticket for the order
        const ticket = await Ticket.findById(data.ticket.id);
        //throw error if not the case
        if (!ticket) {
            throw new Error("Ticket not found");
        }
        //set orderId /make it reserved
        ticket.set({ orderId: data.id });
        //save ticket
        await ticket.save().then((savedTicket) => {
            new TicketUpdatedPublisher(this.client).publish({
                id: savedTicket.id,
                version: savedTicket.version,
                title: savedTicket.title,
                price: savedTicket.price,
                userId: savedTicket.userId,
                orderId: savedTicket.orderId,
            });
        });
        //ack
        msg.ack();
    }
}
