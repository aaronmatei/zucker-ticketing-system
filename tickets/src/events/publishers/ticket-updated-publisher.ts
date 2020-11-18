import { Publisher, Subjects, TicketUpdatedEvent } from "@arzuckertickets/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;

}