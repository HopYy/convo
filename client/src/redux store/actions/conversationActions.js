import * as types from "redux store/constants/conversationConstants"
import * as api from "redux store/api/conversationApi"

export const getConversationsAction = () => 
async (dispatch) => {
    try {
        const { error, data } = await api.getConversations()

        if (error) {
            dispatch({
                type: types.GET_CONVERSATIONS_FAIL,
                payload: error,
                meta: {
                    requiresAuth: true,
                },
            })
            return
        }

        dispatch({
            type: types.GET_CONVERSATIONS_SUCCESS,
            payload: data,
            meta: {
                requiresAuth: true
            }
        })
    } catch (error) {
        dispatch({
            type: types.GET_CONVERSATIONS_FAIL,
            payload: error.message,
            meta: {
                requiresAuth: true,
            },
        })
    }
}

export const getSelectedConversationAction = (friendId) => 
async (dispatch) => {
    try {
        const { error, data } = await api.getSelectedConversation(friendId)

        if(error) {
            dispatch({
                type: types.GET_SINGLE_CONVERSATION_FAIL,
                payload: error,
                meta: {
                    requiresAuth: true,
                },
            })
            return
        }

        dispatch({
            type: types.GET_SINGLE_CONVERSATION_SUCCESS,
            payload: data,
            meta: {
                requiresAuth: true
            }
        })
    } catch (error) {
        dispatch({
            type: types.GET_SINGLE_CONVERSATION_FAIL,
            payload: error.message,
            meta: {
                requiresAuth: true,
            },
        })
    }
}

export const sendMessageAction = (message, conversationId) => 
async (dispatch) => {
    try {
        const { error } = await api.sendMessage(message, conversationId)

        if(error) {
            dispatch({
                type: types.SEND_MESSAGE_FAIL,
                payload: error,
                meta: {
                    requiresAuth: true
                }
            })
        }
    } catch (error) {
        dispatch({
            type: types.SEND_MESSAGE_FAIL,
            payload: error.message,
            meta: {
                requiresAuth: true
            }
        })
    }
}

export const editMessageAction = (message, messageId) => 
async (dispatch) => {
    try {
        const { error } = await api.editMessage(message, messageId)

        if(error) {
            dispatch({
                type: types.EDIT_MESSAGE_FAIL,
                payload: error,
                meta: {
                    requiresAuth: true
                }
            })
        }
    } catch (error) {
        dispatch({
            type: types.EDIT_MESSAGE_FAIL,
            payload: error.message,
            meta: {
                requiresAuth: true
            }
        })
    }
}

export const deleteMessageAction = (messageId) =>
async (dispatch) => {
    try {
        const { error } = await api.deleteMessage(messageId)

        if(error) {
            dispatch({
                type: types.DELETE_MESSAGE_FAIL,
                payload: error,
                meta: {
                    requiresAuth: true
                }
            })
        }
    } catch (error) {
        dispatch({
            type: types.DELETE_MESSAGE_FAIL,
            payload: error.message,
            meta: {
                requiresAuth: true
            }
        })
    }
}

export const seenMessageAction = (conversationId) =>
async (dispatch) => {
    try {
        const { error } = await api.seenMessage(conversationId)

        if(error) {
            dispatch({
                type: types.SEEN_MESSAGE_FAIL,
                payload: error,
                meta: {
                    requiresAuth: true
                }
            })
        }
    } catch (error) {
        dispatch({
            type: types.SEEN_MESSAGE_FAIL,
            payload: error.message,
            meta: {
                requiresAuth: true
            }
        })
    }
}

export const clearConversationAction = (conversationId) => 
async (dispatch) => {
    try {
        const { error, data } = await api.clearConversation(conversationId)

        if(error) {
            dispatch({
                type: types.CLEAR_CONVERSATION_FAIL,
                payload: error,
                meta: {
                    requiresAuth: true
                }
            })
        }

        dispatch({
            type: types.CLEAR_CONVERSATION_SUCCESS,
            payload: data,
            meta: {
                requiresAuth: true
            }
        })
    } catch (error) {
        dispatch({
            type: types.CLEAR_CONVERSATION_FAIL,
            payload: error.message,
            meta: {
                requiresAuth: true
            }
        })
    }
}

export const getNewestConversationAction = (conversationId) => 
async (dispatch) => {
    try {
        const { error, data } = await api.getNewestConversation(conversationId)

        if(error) {
            dispatch({
                type: types.GET_NEWEST_CONVERSATION_FAIL,
                payload: error,
                meta: {
                    requiresAuth: true,
                },
            })
            return
        }

        dispatch({
            type: types.GET_NEWEST_CONVERSATION_SUCCESS,
            payload: data,
            meta: {
                requiresAuth: true
            }
        })
    } catch (error) {
        dispatch({
            type: types.GET_NEWEST_CONVERSATION_FAIL,
            payload: error.message,
            meta: {
                requiresAuth: true,
            },
        })
    }
}