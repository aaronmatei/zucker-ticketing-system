import {
  PaymentCreatedEvent,
  Publisher,
  Subjects,
} from "@arzuckertickets/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
