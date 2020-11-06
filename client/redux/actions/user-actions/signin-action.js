import { LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE } from "./../types"
import axios from "axios"
import { CONSTANTS } from "./../../../constants"

export const signInUser = user => dispatch => {
    return new Promise((resolve, reject) => {
        axios
            .post("/api/v1/users/signin", user)
            .then(res => {
                let user = res.data.user
                let successMessage = res.data.message
                let token = res.data.token
                console.log("SIGN IN RES", res)
                dispatch(loginUserSuccess(user, successMessage, token))
                resolve(successMessage)
            })
            .catch(err => {
                let errors = err.response.data.errors
                console.log("SIGN IN ERRORS", errors)
                dispatch(loginUserFailure(errors))
                reject(errors)
            })

    })
}


const loginUserSuccess = (user, successMessage, token) => {
    return {
        type: LOGIN_USER_SUCCESS,
        payload: {
            successMessage,
            user,
            token
        }
    }
}

const loginUserFailure = errors => {
    return {
        type: LOGIN_USER_FAILURE,
        payload: {
            errors
        }
    }
}