const mongoose = require("mongoose")
const Schema = mongoose.Schema

const conversationSchema = new Schema({
    user1: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    user2: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    messages: [{
        type: mongoose.Schema.ObjectId,
        ref: "Message",
        default: []
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model("Conversation", conversationSchema)