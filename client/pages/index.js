import buildClient from "./../api/build-client";
import axios from "axios";
import React, * as react from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTickets } from "./../redux/actions/ticket-actions/load-tickets-action";
import Link from "next/link";

const LandingPage = ({ loggedInUser }) => {
  const { loading, success, successMessage, errors, tickets } = useSelector(
    (state) => state.ticketsss
  );
  const dispatch = useDispatch();
  react.useEffect(() => {
    console.log("Tickets at index UE", tickets);
  }, []);
  // const { loading, success, successMessage, errors } = useSelector(
  //   (state) => state.ticketsss
  // );

  const ticketList = tickets.map((ticket) => {
    return (
      <tr key={ticket.id}>
        <td>{ticket.id.substring(20, 24)}</td>
        <td>{ticket.title}</td>
        <td>{ticket.price}</td>
        <td>
          <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
            <a>View</a>
          </Link>
        </td>
      </tr>
    );
  });
  return (
    <React.Fragment>
      <div>
        {loggedInUser ? (
          <h5>{`LandingPage: signed in as ${loggedInUser.email}`}</h5>
        ) : (
          <h5>Home Page: You are signed out</h5>
        )}
      </div>
      <div className="dropdown-divider"></div>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h5>Available tickets</h5>
          <Link href="/tickets/new">
            <button className="btn btn-info">New Ticket</button>
          </Link>
        </div>

        {loading ? (
          "Loading tickets..."
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Price</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>{ticketList}</tbody>
          </table>
        )}
      </div>
    </React.Fragment>
  );
};

LandingPage.getInitialProps = async (context) => {
  // const tickets = context.store.getState().ticketsss.tickets;
  // console.log("Tickets at index", tickets);
  return {};
};

export default LandingPage;
