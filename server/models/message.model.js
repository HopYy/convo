const mongoose = require("mongoose")
const Schema = mongoose.Schema

const messageSchema = new Schema({
    body: {
        type: String,
        default: ""
    },
    media: {
        type: String,
        default: null,
    },
    sender: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    receiver: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    seen: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Message", messageSchema)