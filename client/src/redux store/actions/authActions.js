import * as api from "redux store/api/authAPI"
import * as types from "redux store/constants/authConstants"
import { refreshTokenAction } from "./refreshTokenAction"
import { isTokenValid } from "utils/isTokenValid"

export const signUpAction = (values, navigate) =>
async (dispatch) => {
    try {
        const { error, data } = await api.signUp(values)

        if(error) {
            dispatch({
                type: types.SIGN_UP_FAIL,
                payload: error,
            })
            return
        }
            
        dispatch({
            type: types.SIGN_UP_SUCCESS,
            payload: data.message,
        })

        navigate("/sign-in")
    } catch (error) {
        dispatch({
            type: types.SIGN_UP_FAIL,
            payload: error.message,
        })
    }
}

export const signInAction = (values, navigate) =>
async (dispatch) => {
    try {
        const { error, data } = await api.signIn(values)

        if(error) {
            dispatch({
                type: types.SIGN_IN_FAIL,
                payload: error,
            })
            return
        }
        
        const { user, accessToken, refreshToken } = data
        const profile = {
            user,
            accessToken,
            refreshToken,
        }
        localStorage.setItem("profile", JSON.stringify(profile))
        
        dispatch({
            type: types.SIGN_IN_SUCCESS,
            payload: data,
        })
        navigate("/")
    } catch (error) {
        dispatch({
            type: types.SIGN_IN_FAIL,
            payload: error.message,
        })
    }
}

export const editProfileAction = (values) => 
async (dispatch) => {
    try {
        const { error, data } = await api.editProfile(values)

        if(error) {
            dispatch({
                type: types.EDIT_PROFILE_FAIL,
                payload: error,
            })
            return
        }
        
        const { user, accessToken, refreshToken } = data
        const profile = {
            user,
            accessToken,
            refreshToken,
        }
        localStorage.setItem("profile", JSON.stringify(profile))
        dispatch({
            type: types.EDIT_PROFILE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: types.EDIT_PROFILE_FAIL,
            payload: error.message,
        })
    }
}

export const deleteProfileAction = () => 
async (dispatch) => {
    try {
        const { error, data } = await api.deleteProfile()

        if(error) {
            dispatch({
                type: types.DELETE_PROFILE_FAIL,
                payload: error,
            })
            return
        }
        
        localStorage.removeItem("profile")
        dispatch({
            type: types.DELETE_PROFILE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: types.DELETE_PROFILE_FAIL,
            payload: error.message,
        })
    }
}

export const signOutAction = () => async (dispatch) => {
    try {
        const { error, data } = await api.signOut()

        if(error) {
            dispatch({ 
                type: types.SIGN_OUT, 
                payload: error
            })
            return
        }

        localStorage.removeItem("profile")

        dispatch({ 
            type: types.SIGN_OUT, 
            payload: data 
        })
    } catch (error) {
        dispatch({ 
            type: types.SIGN_OUT, 
            payload: error.message 
        })
    }
}  

export const initializeAuth = () => async (dispatch) => {
    const accessToken = JSON.parse(localStorage.getItem("profile"))?.accessToken
    const refreshToken = JSON.parse(localStorage.getItem("profile"))?.refreshToken

    if (accessToken && refreshToken) {
        if (isTokenValid(accessToken)) {
            dispatch(setAccessToken(accessToken))
            dispatch(setRefreshToken(refreshToken))
            dispatch(setUserData(JSON.parse(localStorage.getItem("profile")).user))
        } else {
            await dispatch(refreshTokenAction(refreshToken))
        }
    }
}

export const setAccessToken = (accessToken) => async (dispatch) => {
    dispatch({ 
        type: types.SET_ACCESS_TOKEN, 
        payload: accessToken 
    })
}

export const setRefreshToken = (refreshToken) => async (dispatch) => {
    dispatch({ 
        type: types.SET_REFRESH_TOKEN, 
        payload: refreshToken 
    })
}

export const setUserData = (userData) => async (dispatch) => {
    dispatch({ 
        type: types.SET_USER_DATA, 
        payload: userData 
    })
}

export const setInitialAuthState = (navigate) => async (dispatch) => {
    await dispatch({ 
        type: types.SIGN_OUT 
    })
    navigate("/sign-in")
}

export const clearMessage = () => async (dispatch) => {
    dispatch({ 
        type: types.CLEAR_MESSAGES 
    })
}
