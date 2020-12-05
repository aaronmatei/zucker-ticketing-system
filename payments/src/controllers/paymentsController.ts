import { Request, Response, NextFunction } from "express";
import { Order } from "../models/Order";
import { Payment } from "../models/Payment";
import { PaymentCreatedPublisher } from "./../events/publishers/payment-created-publisher";
import {
  BadRequestError,
  currentUser,
  NotAuthorizedError,
  NotFoundError,
  OrderStatus,
  runValidation,
} from "@arzuckertickets/common";

import { stripe } from "./../stripe";
import { natsWrapper } from "../nats-wrapper";

// create a payment

const createPayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token, orderId } = req.body;
  const order = await Order.findById(orderId);
  if (!order) {
    throw new NotFoundError();
  }
  if (order.userId !== req.currentUser!.id) {
    throw new NotAuthorizedError();
  }

  if (order.status === OrderStatus.Cancelled) {
    throw new BadRequestError("Cannot pay for cancelled order");
  }

  const charge = await stripe.charges.create({
    currency: "usd",
    amount: order.price * 100,
    source: token,
  });

  const payment = Payment.build({
    orderId,
    stripeId: charge.id,
  });

  await payment
    .save()
    .then(async (savedPayment) => {
      await new PaymentCreatedPublisher(natsWrapper.client).publish({
        id: savedPayment.id,
        orderId: savedPayment.orderId,
        stripeId: savedPayment.stripeId,
      });
      // await Order.collection.dropIndexes(function (err, results) {
      //   if (err) {
      //     console.log("Erro", err);
      //   }
      //   console.log("Results", results);
      // });

      res.status(201).json({
        savedPayment,
        message: "Payment information saved successfully",
      });
    })
    .catch((err) => {
      console.log("Errror in saving payment", err);
    });
};

// get payment
const getPayment = async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    message: "get Payment",
  });
};

export { createPayment, getPayment };
