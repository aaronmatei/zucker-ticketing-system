import { Message } from 'node-nats-streaming';
import { Subjects, Listener, TicketUpdatedEvent } from "@arzuckertickets/common";
import { Ticket } from "./../../models/Ticket";
import { QueueGroupName } from "./queue-group-name";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent>{
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
    queueGroupName = QueueGroupName;
    async onMessage(data: TicketUpdatedEvent['data'], msg: Message) {
        //check id and version
        const ticket = await Ticket.findByEvent(data);
        if (!ticket) {
            throw new Error("Ticket [id, version] not found");
        }

        const { id, title, price, userId } = data;
        ticket.set({ title, price })
        await ticket.save();

        msg.ack();

    }
}