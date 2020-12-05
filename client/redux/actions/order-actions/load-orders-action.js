import {
  ORDERS_LOADING,
  ORDERS_LOADED_SUCCESS,
  ORDERS_LOADED_FAILURE,
} from "./../types";
import axios from "axios";

export const loadOrders = () => (dispatch) => {
  dispatch(ordersLoading());
  axios
    .get("/api/v1/orders")
    .then((res) => {
      const orders = res.data.orders;
      console.log("ORDERS FETCHED", orders);
      dispatch(ordersLoadedSuccess(orders));
    })
    .catch((err) => {
      const errors = err.response.data.errors;
      console.log("ERROR IN FETCHING ORDERS", errors);
      dispatch(ordersLoadedFailure(errors));
    });
};

const ordersLoading = () => {
  return {
    type: ORDERS_LOADING,
  };
};

const ordersLoadedSuccess = (orders) => {
  return {
    type: ORDERS_LOADED_SUCCESS,
    payload: { orders },
  };
};

const ordersLoadedFailure = (errors) => {
  return {
    type: ORDERS_LOADED_FAILURE,
    payload: { errors },
  };
};
