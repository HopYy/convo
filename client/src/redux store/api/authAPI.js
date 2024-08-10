import { API, handleApiError } from "./utils"

export const signUp = async (values) => {
    try {
        const { data } = await API.post("/users/sign-up", values)
        return { error: null, data }
    } catch (error) {
        return handleApiError(error)
    }
}

export const signIn = async (values) => {
    try {
        const { data } = await API.post("/users/sign-in", values)
        return { error: null, data }
    } catch (error) {
        return handleApiError(error)
    }
}

export const editProfile = async (values) => {
    try {
        const { data } = await API.patch("/users/edit", values)
        return { error: null, data }
    } catch (error) {
        return handleApiError(error)
    }
}

export const deleteProfile = async (values) => {
    try {
        const { data } = await API.delete("/users/delete")
        return { error: null, data }
    } catch (error) {
        return handleApiError(error)
    }
}

export const signOut = async () => {
    try {
      const { data } = await API.post("/users/sign-out")
      return { error: null, data }
    } catch (error) {
        return handleApiError(error)
    }
}