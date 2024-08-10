import axios from "axios"

const baseURL = process.env.REACT_APP_API_URL

export const API = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
})

API.interceptors.request.use((req) => {
    const accessToken = JSON.parse(localStorage.getItem("profile"))?.accessToken
    if (accessToken) {
        req.headers.Authorization = `Bearer ${accessToken}`
    }
    return req
})

export const handleApiError = async (error) => {
    try {
        const errorMessage =
        error.response?.data?.message || "An unexpected error occurred."
        return { error: errorMessage, data: null }
    } catch (err) {
        throw new Error("An unexpected error occurred.")
    }
}