import { combineReducers } from "@reduxjs/toolkit"

import authReducer from "./authReducer"
import friendsReducer from "./friendsReducers"
import conversationsReducer from "./conversationReducer"
import profileReducer from "./profileReducer"

const rootReducer = combineReducers({
    auth: authReducer,
    friends: friendsReducer,
    conversations: conversationsReducer,
    profile: profileReducer
})

export default rootReducer