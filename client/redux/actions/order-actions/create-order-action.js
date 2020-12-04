import { ORDER_CREATED_SUCCESS, ORDER_CREATED_FAILURE } from "./../types";
import axios from "axios";

export const createOrder = (ticketId) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/v1/orders/create", { ticketId })
      .then((res) => {
        const order = res.data.order;
        dispatch(orderCreatedSuccess(order));
        resolve(order);
      })
      .catch((err) => {
        const errors = err.response.data.errors;
        dispatch(orderCreatedFailure(errors));
        reject(errors);
      });
  });
};

const orderCreatedSuccess = (order) => {
  return {
    type: ORDER_CREATED_SUCCESS,
    payload: {
      order,
    },
  };
};
const orderCreatedFailure = (errors) => {
  return {
    type: ORDER_CREATED_FAILURE,
    payload: {
      errors,
    },
  };
};
