import { Ticket } from "../../../models/Ticket";
import { natsWrapper } from "../../../nats-wrapper";
import { ExpirationCompleteListener } from "./../expiration-complete-listener";
import { OrderStatus, ExpirationCompleteEvent } from "@arzuckertickets/common";
import mongoose from "mongoose";
import { Order } from "../../../models/Order";
import { Message } from "node-nats-streaming";

const setUp = async () => {
  const listener = new ExpirationCompleteListener(natsWrapper.client);
  const ticket = Ticket.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: "concert",
    price: 40,
  });
  await ticket.save();
  const order = Order.build({
    status: OrderStatus.Created,
    userId: "bhugvurijwekofiru",
    expiresAt: new Date(),
    ticket,
  });
  await order.save();

  const data: ExpirationCompleteEvent["data"] = {
    orderId: order.id,
  };
  //@ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, ticket, order, data, msg };
};

it("it updates the order status to cancelled", async () => {
  const { listener, ticket, order, data, msg } = await setUp();
  await listener.onMessage(data, msg);
  const updatedOrder = await Order.findById(order.id);
  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it("it emits an order cancelled event", async () => {
  const { listener, order, data, msg } = await setUp();
  await listener.onMessage(data, msg);
  expect(natsWrapper.client.publish).toHaveBeenCalled();
  const eventData = JSON.parse(
    (natsWrapper.client.publish as jest.Mock).mock.calls[0][1]
  );
  expect(eventData.id).toEqual(order.id);
});

it("it ack message", async () => {
  const { listener, data, msg } = await setUp();
  await listener.onMessage(data, msg);
  expect(msg.ack).toHaveBeenCalled();
});
