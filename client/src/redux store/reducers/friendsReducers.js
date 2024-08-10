import * as types from "redux store/constants/friendsConstants"
import { SIGN_OUT } from "redux store/constants/authConstants"
import { remove } from "utils/remove"

const initState = {
    userFriends: [],
    newFriends: [],
    friendRequests: [],
    searchFriends: null,
    errorMessage: null,
}


const friendsReducer = (state = initState, action) => {
    const { type, payload } = action

    switch (type) {
        case SIGN_OUT:
            return {
                ...state,
                userFriends: [],
                newFriends: [],
                friendRequests: [],
                searchFriends: null,
                errorMessage: null,
            }
        case types.GET_FRIENDS_SUCCESS:
            return {
                ...state,
                userFriends: payload ? payload : [],
                newFriends: [],
                errorMessage: null
            }
        case types.BLOCK_FRIEND_SUCCESS:
            return {
                ...state,
                userFriends: remove(state.userFriends, payload),
                newFriends: remove(state.newFriends, payload),
                friendRequests: remove(state.friendRequests, payload),
                errorMessage: null
            }
        case types.REMOVE_FRIEND_SUCCESS: 
            return {
                ...state,
                userFriends: remove(state.userFriends, payload),
                errorMessage: null
            }
        case types.REMOVE_FRIEND_FAIL:
        case types.BLOCK_FRIEND_FAIL:
        case types.UNBLOCK_FRIEND_FAIL:
        case types.GET_FRIENDS_FAIL:
            return {
                ...state,
                userFriends: [],
                errorMessage: payload ? payload : "Something went wrong"
            }
        case types.GET_NEW_FRIENDS_SUCCESS:
            return {
                ...state,
                newFriends: payload ? payload : [],
                userFriends: [],
                errorMessage: null,
            }
        case types.GET_NEW_FRIENDS_FAIL:
            return {
                ...state,
                newFriends: [],
                errorMessage: payload ? payload : "Something went wrong"
            }
        case types.SEARCH_FRIENDS_SUCCESS:
            return {
                ...state,
                searchFriends: payload ? payload : null,
                errorMessage: null
            }
        case types.SEARCH_FRIENDS_FAIL:
            return {
                ...state,
                searchFriends: null,
                errorMessage: payload ? payload : null
            }
        case types.CLEAR_SEARCH_FRIENDS:
            return {
                ...state,
                searchFriends: null,
                errorMessage: null
            }
        case types.ACCEPT_FRIEND_REQUEST_SUCCES:
        case types.REJECT_FRIEND_REQUEST_SUCCES:
        case types.GET_FRIEND_REQUESTS_SUCCESS:
            return {
                ...state,
                friendRequests: payload ? payload : [],
                errorMessage: null
            }
        case types.SEND_FRIEND_REQUEST_FAIL:
        case types.ACCEPT_FRIEND_REQUEST_FAIL:
        case types.REJECT_FRIEND_REQUEST_FAIL:
        case types.GET_FRIEND_REQUESTS_FAIL:
            return {
                ...state,
                friendRequests: [],
                errorMessage: payload ? payload : null,
            }
        default:
            return state
    }
}

export default friendsReducer