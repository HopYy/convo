import { API, handleApiError } from "./utils"

export const getFriends = async () => {
    try {
        const { data } = await API.get("/friends")
        return { error: null, data }
    } catch (error) {
        return handleApiError(error)
    }
}

export const getNewFriends = async () => {
    try {
        const { data } = await API.get("/friends/add")
        return { error: null, data }
    } catch (error) {
        return handleApiError(error)
    }
} 

export const getAllFriendRequests = async () => {
    try {
        const { data } = await API.get("/friends/requests")
        return { error: null, data }
    } catch (error) {
        return handleApiError(error)
    }
}

export const sendFriendRequest = async (friendId) => {
    try {
        await API.post(`/friends/request/${friendId}`)
        return { error: null }
    } catch (error) {
        return handleApiError(error)
    }
}

export const acceptFriendRequest = async (friendId) => {
    try {
        const { data } = await API.patch(`/friends/request/${friendId}`)
        return { error: null, data }
    } catch (error) {
        return handleApiError(error)
    }
}

export const rejectFriendRequest = async (friendId) => {
    try {
        const { data } = await API.delete(`/friends/request/${friendId}`)
        return { error: null, data }
    } catch (error) {
        return handleApiError(error)
    }
}

export const removeFriend = async (friendId) => {
    try {
        const { data } = await API.patch(`/friends/remove/${friendId}`)
        return { error: null, data }
    } catch (error) {
        return handleApiError(error)
    }
}

export const blockFriend = async (friendId) => {
    try {
        const { data } = await API.patch(`/friends/block/${friendId}`)
        return { error: null, data }
    } catch (error) {
        return handleApiError(error)
    }
}

export const unblockFriend = async (friendId) => {
    try {
        await API.delete(`/friends/unblock/${friendId}`)
        return { error: null }
    } catch (error) {
        return handleApiError(error)
    }
}

export const searchFriends = async (value) => {
    try {
        const { data } = await API.get(`/friends/search?q=${value}`)
        return { error: null, data }
    } catch (error) {
        return handleApiError(error)
    }
}