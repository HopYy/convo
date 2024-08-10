const mongoose = require("mongoose")
const Schema = mongoose.Schema

const relationshipSchema = new Schema({
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
    status: {
        type: String,
        enum: ['pending', 'accepted', 'blocked'],
        default: 'pending',
    },
    conversation: {
        type: mongoose.Schema.ObjectId,
        ref: "Conversation"
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Relationship", relationshipSchema)
