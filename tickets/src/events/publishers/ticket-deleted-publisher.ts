import { Publisher, Subjects, TicketDeletedEvent } from "@arzuckertickets/common";

export class TicketDeletedPublisher extends Publisher<TicketDeletedEvent>{
    subject: Subjects.TicketDeleted = Subjects.TicketDeleted;

}