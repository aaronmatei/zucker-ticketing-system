import { REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE } from "../types";
import axios from "axios";
import { CONSTANTS } from "./../../../constants"

export const login = (user) => (dispatch) => {
    return new Promise((resolve, reject) => {
        axios
            .post("/api/v1/users/signup", user)
            .then((res) => {
                let user = res.data.user;
                let successMessage = res.data.message;
                let token = res.data.token;
                dispatch(signupUserSuccess(user, successMessage, token));
                resolve(successMessage);
            })
            .catch((err) => {
                let error = err.response.data.error;
                dispatch(signupUserFailure(error));
                reject(error);
            });
    });
};

const signupUserSuccess = (user, successMessage, token) => {
    return {
        type: REGISTER_USER_SUCCESS,
        payload: {
            successMessage,
            user,
            token
        },
    };
};

const signupUserFailure = (error) => {
    return {
        type: REGISTER_USER_FAILURE,
        payload: {
            error,
        },
    };
};
