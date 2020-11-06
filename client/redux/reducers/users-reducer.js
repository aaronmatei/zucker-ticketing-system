import {
    AUTH_ERROR,
    LOGIN_USER_FAILURE,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER_FAILURE,
    LOGOUT_USER_SUCCESS,
    REGISTER_USER_FAILURE,
    REGISTER_USER_SUCCESS,
    USER_LOADED,
    USER_LOADING,
} from "./../actions/types";

let token;

if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
}

let initialState = {
    token: token,
    user: null,
    auth: {
        isAdmin: false,
        isRestricted: false,
    },
    loading: null,
    success: null,
    successMessage: null,
    errors: [],
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                loading: true,
            };
        case USER_LOADED:
            return {
                ...state,
                loading: false,
                user: action.payload.user,
                errors: [],
            };
        case REGISTER_USER_SUCCESS:
        case LOGIN_USER_SUCCESS:
            if (typeof window !== "undefined") {
                localStorage.setItem("token", action.payload.token);
            }

            return {
                ...state,
                token: action.payload.token,
                user: action.payload.user,
                loading: false,
                errors: [],
                successMessage: action.payload.successMessage,
                success: true
            };
        case REGISTER_USER_FAILURE:
        case LOGIN_USER_FAILURE:
        case LOGOUT_USER_FAILURE:
        case AUTH_ERROR:
            return {
                ...state,
                errors: action.payload.errors,
                success: false,
                successMessage: null
            }
        case LOGOUT_USER_SUCCESS:
            if (typeof window !== "undefined") {
                localStorage.removeItem("token");
            }
            return {
                ...state,
                token: null,
                user: null,
                auth: {
                    isAdmin: false,
                    isRestricted: false,
                },
                loading: false,
                success: null,
                successMessage: action.payload.message,
                errors: [],
            };
        default:
            return state;
    }
};

export default usersReducer;
