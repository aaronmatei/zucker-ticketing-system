import { LOGOUT_USER_SUCCESS, LOGOUT_USER_FAILURE } from "./../types";
import axios from "axios";
import { CONSTANTS } from "./../../../constants"

export const signUserOut = (user) => (dispatch) => {
    return new Promise((resolve, reject) => {
        axios
            .post("/api/v1/users/signout", user)
            .then((res) => {
                let message = res.data.message;
                console.log("SIGN OUT RES", res);
                dispatch(signoutUserSuccess(message));
                resolve(message)
            })
            .catch((err) => {
                let errors = err.response.data.errors;
                console.log("SIGN OUT ERRORS", errors);
                dispatch(signoutUserFailure(errors));
                reject(errors)
            });
    });
};

const signoutUserSuccess = (message) => {
    return {
        type: LOGOUT_USER_SUCCESS,
        payload: {
            message,
        },
    };
};

const signoutUserFailure = (errors) => {
    return {
        type: LOGOUT_USER_FAILURE,
        payload: {
            errors,
        },
    };
};
