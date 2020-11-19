import { Publisher, OrderCreatedEvent, Subjects } from "@arzuckertickets/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent>{
    subject: Subjects.OrderCreated = Subjects.OrderCreated;

}