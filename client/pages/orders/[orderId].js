import React, * as react from "react";
import useRequest from "./../../hooks/use-request";
import Router, { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { loadTickets } from "./../../redux/actions/ticket-actions/load-tickets-action";
import { createOrder } from "./../../redux/actions/order-actions/create-order-action";
import moment from "moment";
import StripeCheckout from "react-stripe-checkout";

const OrderShow = ({ orderId, orders, order, loggedInUser }) => {
  const [timeLeft, setTimeLeft] = react.useState(0);

  // do request

  const { doRequest, errors } = useRequest({
    url: "/api/v1/payments/create",
    method: "post",
    body: {
      orderId: order.id,
    },
    onSuccess: () => Router.push("/orders"),
  });

  react.useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [order]);

  return (
    <div>
      {timeLeft < 0 ? (
        <div>Your order has expired</div>
      ) : (
        <div>You have {timeLeft} seconds to pay for this order</div>
      )}

      <div className="card">
        <div className="card-header">
          Expires At:{" "}
          {order &&
            moment(order.expiresAt).format("dddd, MMMM Do YYYY, h:mm:ss a")}
        </div>
        <div className="card-body">
          <p className="card-title">Ticket ID: {order && order.ticket.id}</p>
          <p className="card-text">
            Ticket Title: {order && order.ticket.title}
          </p>
          <button className="btn btn-danger">Cancel</button>
          <StripeCheckout
            token={({ id }) => doRequest({ token: id })}
            stripeKey="pk_test_fhni8xX2PqYjfjgPfW7yhzln00qwRVPGvf"
            amount={order.ticket.price * 100}
            email={loggedInUser.email}
          />
        </div>
      </div>
      {errors}
    </div>
  );
};

OrderShow.getInitialProps = async (context, client) => {
  const { orders, errors } = context.store.getState().ordersss;
  // const ticketId = context.query; object
  const orderId = context.query.orderId;
  const thisOrder = orders.filter((order) => order.id === orderId);
  const order = thisOrder[0];

  return { orderId, orders, order, errors };
};

export default OrderShow;
