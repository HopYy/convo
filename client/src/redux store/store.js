import { configureStore } from "@reduxjs/toolkit"

import rootReducer from "./reducers"
import { tokenMiddleware } from "middlewares/tokenMiddleware"
import { initializeAuth } from "./actions/authActions"

const createAppStore = async () => {
    try {
        const store = configureStore({
            reducer: rootReducer,
            middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tokenMiddleware)
        })

        await store.dispatch(initializeAuth())

        return store
    } catch (error) {
        throw new Error("Some error occurred")
    }
}

export default createAppStore
