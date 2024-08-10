import * as types from "redux store/constants/profileConstants"
import { SIGN_OUT } from "redux store/constants/authConstants"

const initState = {
    open: false,
    profile: null,
    isUser: false
}

const profileReducer = (state = initState, action) => {
    const { type, payload } = action

    switch (type) {
        case SIGN_OUT:
            return {
                open: false,
                profile: null,
                isUser: false,
            }
        case types.OPEN_SIDEBAR:
            return {
                ...state,
                open: true,
                isUser: false,
                profile: payload,
            }
        case types.USER_SIDEBAR:
            return {
                ...state,
                open: true,
                profile: payload ? payload : null,
                isUser: true,
            }
        case types.CLOSE_SIDEBAR:
            return {
                ...state,
                open: false,
                profile: null,
                isUser: false
            }
        default:
            return state
    }
}

export default profileReducer