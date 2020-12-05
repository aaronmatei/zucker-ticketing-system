import React, * as react from "react";
import useRequest from "./../../hooks/use-request";
import Router, { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { loadTickets } from "./../../redux/actions/ticket-actions/load-tickets-action";
import { createOrder } from "./../../redux/actions/order-actions/create-order-action";

const TicketShow = ({ ticketId, ticket }) => {
  const router = useRouter();
  react.useEffect(() => {
    // dispatch(loadTickets());
  }, []);
  const dispatch = useDispatch();
  const [errors, setErrors] = react.useState([]);
  const createOrderDispatch = (createOrderAction) => {
    dispatch(createOrderAction)
      .then((res) => {
        console.log("ORDER CREATED", res);
        router.push("/orders");
      })
      .catch((errors) => {
        setErrors(errors);
        // console.log(errors);
      });
  };

  // const { doRequest, errors } = useRequest({
  //   url: "/api/v1/orders/create",
  //   method: "post",
  //   body: {
  //     ticketId: ticket.id,
  //   },
  //   onSuccess: (order) => {
  //     router.push("/orders/index");
  //   },
  // });

  return (
    <div>
      {`Ticket Show for: ${ticketId} `}

      <div className="card">
        <div className="card-header">
          Ticket Price: {ticket && ticket.price}
        </div>
        <div className="card-body">
          <h5 className="card-title">{ticket && ticket.title}</h5>
          <p className="card-text">
            With supporting text below as a natural lead-in to additional
            content.With supporting text below as a natural lead-in to
            additional content.With supporting text below as a natural lead-in
            to additional content.
          </p>
          <button
            onClick={() => createOrderDispatch(createOrder(ticketId))}
            className="btn btn-primary"
          >
            Purchase
          </button>
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

TicketShow.getInitialProps = async (context, client) => {
  const tickets = context.store.getState().ticketsss.tickets;
  // const ticketId = context.query; object
  const ticketId = context.query.ticketId;
  const thisticket = tickets.filter((ticket) => ticket.id === ticketId);
  const ticket = thisticket[0];

  return { ticketId, ticket };
};

export default TicketShow;
