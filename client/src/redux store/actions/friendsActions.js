import * as api from "redux store/api/friendsAPI"
import * as types from "redux store/constants/friendsConstants"

export const getFriendsAction = () => 
async (dispatch) => {
    try {
        const { error, data } = await api.getFriends()

        if (error) {
            dispatch({
                type: types.GET_FRIENDS_FAIL,
                payload: error,
                meta: {
                    requiresAuth: true,
                },
            })
            return
        }

        dispatch({
            type: types.GET_FRIENDS_SUCCESS,
            payload: data,
            meta: {
                requiresAuth: true,
            },
        })
    } catch (error) {
        dispatch({
            type: types.GET_FRIENDS_FAIL,
            payload: error.message,
            meta: {
                requiresAuth: true,
            },
        })
    }
}

export const getNewFriendsAction = () => 
async (dispatch) => {
    try {
        const { error, data } = await api.getNewFriends()

        if(error) {
            dispatch({
                type: types.GET_NEW_FRIENDS_FAIL,
                payload: error,
                meta: {
                    requiresAuth: true,
                },
            })
            return
        }

        dispatch({
            type: types.GET_NEW_FRIENDS_SUCCESS,
            payload: data,
            meta: {
                requiresAuth: true,
            },
        })
    } catch (error) {
        dispatch({
            type: types.GET_NEW_FRIENDS_FAIL,
            payload: error.message,
            meta: {
                requiresAuth: true,
            },
        })
    }
}

export const getAllFriendRequestsAction = () =>
async (dispatch) => {
    try {
        const { error, data } = await api.getAllFriendRequests()

        if(error) {
            dispatch({
                type: types.GET_FRIEND_REQUESTS_FAIL,
                payload: error,
                meta: {
                    requiresAuth: true
                }
            })
            return
        }

        dispatch({
            type: types.GET_FRIEND_REQUESTS_SUCCESS,
            payload: data,
            meta: {
                requiresAuth: true
            }
        })
    } catch (error) {
        dispatch({
            type: types.GET_FRIEND_REQUESTS_FAIL,
            payload: error.message,
            meta: {
                requiresAuth: true
            }
        })
    }
}

export const sendFriendRequestAction = (friendId) =>
async (dispatch) => {
    try {
        const { error } = await api.sendFriendRequest(friendId)

        if(error) {
            dispatch({
                type: types.SEND_FRIEND_REQUEST_FAIL,
                payload: error,
                meta: {
                    requiresAuth: true,
                },
            })
            return
        }
    } catch (error) {
        dispatch({
            type: types.SEND_FRIEND_REQUEST_FAIL,
            payload: error.message,
            meta: {
                requiresAuth: true,
            },
        })
    }
}

export const rejectFriendRequestAction = (friendId) =>
async (dispatch) => {
    try {
        const { error, data } = await api.rejectFriendRequest(friendId)

        if(error) {
            dispatch({
                type: types.REJECT_FRIEND_REQUEST_FAIL,
                payload: error,
                meta: {
                    requiresAuth: true,
                },
            })
            return
        }

        dispatch({
            type: types.REJECT_FRIEND_REQUEST_SUCCES,
            payload: data,
            meta: {
                requiresAuth: true,
            },
        })
    } catch (error) {
        dispatch({
            type: types.REJECT_FRIEND_REQUEST_FAIL,
            payload: error.message,
            meta: {
                requiresAuth: true,
            },
        })
    }
}

export const acceptFriendRequestAction = (friendId) => 
async (dispatch) => {
    try {
        const { error, data } = await api.acceptFriendRequest(friendId)

        if(error) {
            dispatch({
                type: types.ACCEPT_FRIEND_REQUEST_FAIL,
                payload: error,
                meta: {
                    requiresAuth: true,
                },
            })
            return
        }

        dispatch({
            type: types.ACCEPT_FRIEND_REQUEST_SUCCES,
            payload: data,
            meta: {
                requiresAuth: true,
            },
        })
    } catch (error) {
        dispatch({
            type: types.ACCEPT_FRIEND_REQUEST_FAIL,
            payload: error.message,
            meta: {
                requiresAuth: true,
            },
        })
    }
}

export const removeFriendAction = (friendId) => 
async (dispatch) => {
    try {
        const { error, data } = await api.removeFriend(friendId)

        if(error) {
            dispatch({
                type: types.REMOVE_FRIEND_FAIL,
                payload: error,
                meta: {
                    requiresAuth: true,
                },
            })
            return
        }

        dispatch({
            type: types.REMOVE_FRIEND_SUCCESS,
            payload: data,
            meta: {
                requiresAuth: true,
            },
        })
    } catch (error) {
        dispatch({
            type: types.REMOVE_FRIEND_FAIL,
            payload: error.message,
            meta: {
                requiresAuth: true,
            },
        })
    }
}

export const blockFriendAction = (friendId) => 
async (dispatch) => {
    try {
        const { error, data } = await api.blockFriend(friendId)

        if(error) {
            dispatch({
                type: types.BLOCK_FRIEND_FAIL,
                payload: error,
                meta: {
                    requiresAuth: true,
                },
            })
            return
        }

        dispatch({
            type: types.BLOCK_FRIEND_SUCCESS,
            payload: data,
            meta: {
                requiresAuth: true,
            },
        })
    } catch (error) {
        dispatch({
            type: types.BLOCK_FRIEND_FAIL,
            payload: error.message,
            meta: {
                requiresAuth: true,
            },
        })
    }
}

export const unblockFriendAction = (friendId) => 
async (dispatch) => {
    try {
        const { error } = await api.unblockFriend(friendId)

        if(error) {
            dispatch({
                type: types.UNBLOCK_FRIEND_FAIL,
                payload: error,
                meta: {
                    requiresAuth: true,
                },
            })
            return
        }
    } catch (error) {
        dispatch({
            type: types.UNBLOCK_FRIEND_FAIL,
            payload: error.message,
            meta: {
                requiresAuth: true,
            },
        })
    }
}

export const searchFriendsAction = (value) => 
async (dispatch) => {
    try {
        const { error, data } = await api.searchFriends(value)
        
        if(error) {
            dispatch({
                type: types.SEARCH_FRIENDS_FAIL,
                payload: error,
                meta: {
                    requiresAuth: true,
                },
            })
            return
        }

        dispatch({
            type: types.SEARCH_FRIENDS_SUCCESS,
            payload: data,
            meta: {
                requiresAuth: true,
            },
        })
    } catch (error) {
        dispatch({
            type: types.SEARCH_FRIENDS_FAIL,
            payload: error.message,
            meta: {
                requiresAuth: true,
            },
        })
    }
}