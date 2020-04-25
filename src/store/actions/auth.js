import * as actionTypes from "./actionTypes";
import axios from "axios"
import apiKey from "../../config"

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    }
}

export const authFail = (authData) => {
    return {
        type: actionTypes.AUTH_FAIL
    };
};

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCjPxsNvlMA_pF-Qp-4PTUFFp21kPvDBb4', authData)
        .then(response => {
            console.log(response);
            dispatch(authSuccess(response.data))
        })
        .catch(err => {
            console.log(err, "error");
            dispatch(authFail(err))
        })

    }
}