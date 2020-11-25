import buildClient from "./../api/build-client";
import axios from "axios";
import React, * as react from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTickets } from "./../redux/actions/ticket-actions/load-tickets-action";
import Link from "next/link";

const LandingPage = (props) => {
  const dispatch = useDispatch();
  react.useEffect(() => {
    console.log("USE EFFECT CALLED");
    dispatch(loadTickets());
  }, [dispatch]);
  const { loading, success, successMessage, errors, tickets } = useSelector(
    (state) => state.ticketsss
  );

  const ticketList = tickets.map((ticket) => {
    return (
      <tr key={ticket.id}>
        <td>{ticket.id.substring(20, 24)}</td>
        <td>{ticket.title}</td>
        <td>{ticket.price}</td>
        <td>
          <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
            <a href="">View</a>
          </Link>
        </td>
      </tr>
    );
  });
  return (
    <React.Fragment>
      <div>
        {props.loggedInUser ? (
          <h3>{`LandingPage: signed in as ${props.loggedInUser.email}`}</h3>
        ) : (
          <h3>Home Page: You are signed out</h3>
        )}
      </div>
      <div className="dropdown-divider"></div>
      <div>
        <h1>Available tickets</h1>
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
  // const state = reduxStore.getState();
  // console.log("REDUX STORE STATE", context.store.getState());
  // context.store.dispatch(loadTickets());
  // const tickets = context.store.getState().ticketsss;
  // console.log("Tickets", tickets);
  return {};
};

export default LandingPage;
