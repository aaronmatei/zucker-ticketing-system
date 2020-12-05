import {
  TICKETS_LOADING,
  TICKETS_LOADED_SUCCESS,
  TICKETS_LOADED_FAILURE,
} from "../actions/types";

let initialState = {
  loading: null,
  success: null,
  successMessage: null,
  errors: [],
  tickets: [],
};

const ticketsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TICKETS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case TICKETS_LOADED_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        errors: [],
        tickets: action.payload.tickets,
      };
    case TICKETS_LOADED_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        errors: action.payload.errors,
        tickets: [],
      };
    default:
      return state;
  }
};

export default ticketsReducer;
