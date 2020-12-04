import React, * as react from "react";
import useRequest from "./../../hooks/use-request";
import Router, { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { loadTickets } from "./../../redux/actions/ticket-actions/load-tickets-action";
import { createOrder } from "./../../redux/actions/order-actions/create-order-action";
import moment from "moment";

const OrderShow = ({ orderId, orders, order, errors }) => {
  return (
    <div>
      <h5>{`ORDER ID: ${orderId} `}</h5>
      <h5>
        {`EXPIRES ON: ${
          order &&
          moment(order.expiresAt).format("dddd, MMMM Do YYYY, h:mm:ss a")
        }`}
      </h5>

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
          <button className="btn btn-primary">Cancel</button>
        </div>
      </div>
      {errors.length > 0 && (
        <div className="alert alert-danger">
          <h4>Oops....</h4>
          <ul className="my-0">
            {errors.map((err) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      )}
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
