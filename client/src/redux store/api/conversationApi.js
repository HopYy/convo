import { API, handleApiError } from "./utils"

export const getConversations = async () => {
    try {
        const { data } = await API.get("/conversations")
        return { error: null, data }
    } catch (error) {
        return handleApiError(error)
    }
}

export const getSelectedConversation = async (friendId) => {
    try {
        const { data } = await API.get(`/conversations/${friendId}`)
        return { error: null, data }
    } catch (error) {
        return handleApiError(error)
    }
}

export const sendMessage = async (message, conversationId) => {
    try {
        await API.post(
            `/conversations/message/send/${conversationId}`, 
            message
        )
        return { error: null }
    } catch (error) {
        return handleApiError(error)
    }
}

export const editMessage = async (message, messageId) => {
    try {
        await API.patch(
            `/conversations/message/edit/${messageId}`, 
            message
        )
        return { error: null }
    } catch (error) {
        return handleApiError(error)
    }
}

export const deleteMessage = async (messageId) => {
    try {
        await API.delete(`/conversations/message/delete/${messageId}`)
        return { error: null }
    } catch (error) {
        return handleApiError(error)
    }
}

export const seenMessage = async (conversationId) => {
    try {
        await API.patch(`/conversations/message/seen/${conversationId}`)
        return { error: null }
    } catch (error) {
        return handleApiError(error)
    }
}

export const clearConversation = async (conversationId) => {
    try {
        const { data } = await API.patch(`/conversations/clear/${conversationId}`)
        return { error: null, data }
    } catch (error) {
        return handleApiError(error)
    }
}

export const getNewestConversation = async (conversationId) => {
    try {
        const { data } = await API.get(`/conversations/new/${conversationId}`)
        return { error: null, data }
    } catch (error) {
        return handleApiError(error)
    }
}