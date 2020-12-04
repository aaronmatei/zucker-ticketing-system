import {
  ORDERS_LOADING,
  ORDERS_LOADED_SUCCESS,
  ORDERS_LOADED_FAILURE,
  ORDER_CREATED_SUCCESS,
  ORDER_CREATED_FAILURE,
} from "../actions/types";

let initialState = {
  loading: null,
  success: null,
  successMessage: null,
  errors: [],
  orders: [],
  order: {},
};

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDERS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ORDERS_LOADED_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        errors: [],
        orders: action.payload.orders,
      };
    case ORDERS_LOADED_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        errors: action.payload.errors,
        orders: [],
      };
    case ORDER_CREATED_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        errors: [],
        order: action.payload.order,
      };
    case ORDER_CREATED_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        errors: action.payload.errors,
        order: {},
      };
    default:
      return state;
  }
};

export default ordersReducer;
