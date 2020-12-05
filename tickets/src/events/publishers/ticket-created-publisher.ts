import {
    Publisher,
    Subjects,
    TicketCreatedEvent,
} from "@arzuckertickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}

