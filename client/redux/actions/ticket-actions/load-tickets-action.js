import {
  TICKETS_LOADING,
  TICKETS_LOADED_SUCCESS,
  TICKETS_LOADED_FAILURE,
} from "./../types";
import axios from "axios";

export const loadTickets = () => (dispatch) => {
  dispatch(ticketsLoading);
  axios
    .get("/api/v1/tickets")
    .then((res) => {
      console.log("TICKETS FETCHED", res.data.tickets);
      dispatch(ticketsLoadedSuccess(res.data.tickets));
    })
    .catch((err) => {
      console.log("ERROR IN FETCHING TICKETS", err.response.data.errors);
      dispatch(ticketsLoadedFailure(err.response.data.errors));
    });
};

const ticketsLoading = () => {
  return {
    type: TICKETS_LOADING,
  };
};

const ticketsLoadedSuccess = (tickets) => {
  return {
    type: TICKETS_LOADED_SUCCESS,
    payload: { tickets },
  };
};

const ticketsLoadedFailure = (errors) => {
  return {
    type: TICKETS_LOADED_FAILURE,
    payload: { errors },
  };
};
