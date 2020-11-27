import React, * as react from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { loadTickets } from "./../../redux/actions/ticket-actions/load-tickets-action";

const TicketShow = () => {
  react.useEffect(() => {
    dispatch(loadTickets());
  }, []);
  const dispatch = useDispatch();
  const { loading, success, successMessage, errors, tickets } = useSelector(
    (state) => state.ticketsss
  );
  const ticketId = useRouter().query.ticketId;
  const ticket = tickets.filter((ticket) => {
    return ticket.id === ticketId;
  });

  return (
    <div>
      {`Ticket Show for: ${ticketId} `}

      <div className="card">
        <div className="card-header">
          Ticket Price: {ticket && ticket[0].price}
        </div>
        <div className="card-body">
          <h5 className="card-title">{ticket && ticket[0].title}</h5>
          <p className="card-text">
            With supporting text below as a natural lead-in to additional
            content.With supporting text below as a natural lead-in to
            additional content.With supporting text below as a natural lead-in
            to additional content.
          </p>
          <button href="#" className="btn btn-primary">
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

TicketShow.getInitialProps = async (context, client) => {};

export default TicketShow;
