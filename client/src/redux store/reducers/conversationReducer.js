import * as types from "redux store/constants/conversationConstants"
import { SIGN_OUT } from "redux store/constants/authConstants"
import { remove } from "utils/remove"

const initState = {
    conversations: [],
    selectedConversation: null,
    messages: [],
    errorConversations: null,
    errorSelectedConversation: null,
}

const conversationsReducer = (state = initState, action) => {
    const { type, payload } = action

    switch (type) {
        case SIGN_OUT:
            return {
                ...state,
                conversations: [],
                selectedConversation: null,
                messages: [],
                errorConversations: null,
                errorSelectedConversation: null,
            }
        case types.GET_CONVERSATIONS_SUCCESS:
            return {
                ...state,
                conversations: payload ? payload : [],
                errorConversations: null
            }
        case types.GET_CONVERSATIONS_FAIL:
            return {
                ...state,
                conversations: [],
                errorConversations: payload ? payload : "Something went wrong"
            }
        case types.GET_SINGLE_CONVERSATION_SUCCESS:
            return {
                ...state,
                selectedConversation: payload ? {
                    _id: payload._id,
                    friend: payload.friend
                } : null,
                messages: payload ? payload.messages : [],
                errorSelectedConversation: null
            }
        case types.DELETE_MESSAGE_FAIL:
        case types.EDIT_MESSAGE_FAIL:
        case types.SEND_MESSAGE_FAIL:
        case types.CLEAR_CONVERSATION_FAIL:
        case types.SEEN_MESSAGE_FAIL:
        case types.GET_SINGLE_CONVERSATION_FAIL:
            return {
                ...state,
                selectedConversation: null,
                messages: [],
                errorSelectedConversation: payload ? payload : "Something went wrong"
            }
        case types.CLEAR_CONVERSATION_SUCCESS:
            return {
                ...state,
                selectedConversation: null,
                conversations: remove(state.conversations, payload._id),
                messages: [],
                errorConversations: null,
                errorSelectedConversation: null
            }
        case types.CLOSE_CONVERSATION:
            return {
                ...state,
                selectedConversation: null,
                messages: [],
                errorSelectedConversation: null
            }
        case types.CLEAR_ERRORS:
            return {
                ...state,
                errorConversations: null,
                errorSelectedConversation: null,
            }
        default:
            return state
    }
}

export default conversationsReducer