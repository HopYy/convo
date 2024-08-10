const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        maxLenght: 20,
        minLength: 3,
        trim: true,
    },
    password: {
        type: String,
        minLength: 6,
        required: true,
    },
    name: {
        type: String,
        minLength: 3,
        maxLenght: 40,
        required: true,
    },
    bio: {
        type: String,
    },
    avatar: {
        type: String,
    },
},
{
    timestamps: true,
}
)

module.exports = mongoose.model("User", userSchema)