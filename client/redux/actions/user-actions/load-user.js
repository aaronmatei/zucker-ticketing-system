import { USER_LOADING, USER_LOADED, AUTH_ERROR } from "./../types"
import { tokenConfig } from "./tokenConfig"
import axios from "axios"
import { CONSTANTS } from "./../../../constants"

export const loadUser = () => (dispatch, getState) => {
    dispatch(userLoading)
    axios
        .get("/api/v1/users/currentuser", tokenConfig(getState))
        .then(res => {
            dispatch(userLoadedSuccess(res.data.loggedInUser))
        })
        .catch(err => {
            dispatch(userLoadedFailure(err.response.data.errors))
        })
}

const userLoading = () => {
    return {
        type: USER_LOADING
    }
}


const userLoadedSuccess = (user) => {
    return {
        type: USER_LOADED,
        payload: { user }
    }
}

const userLoadedFailure = (errors) => {
    return {
        type: AUTH_ERROR,
        payload: { errors }
    }
}