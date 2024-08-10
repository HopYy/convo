const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const User = require("../models/user.model")
const Token = require("../models/token.model")
const Relationship = require("../models/relationship.model")
const Conversation = require("../models/conversation.model")
const pusherServer = require("../utils/pusher")

const signUp = async (req, res) => {
    try {
        const { name, username, password, bio, avatar, } = req.body
        const existingUser = await User.findOne({ username })

        const usernameRegex = /^[a-zA-Z0-9_-]+$/
        if (!usernameRegex.test(username)) {
            return res.status(400).json({
                message: "Username can only contain letters, numbers, underscores, and hyphens."
            })
        }
        
        if (username.length < 3 || username.length > 20) {
            return res.status(400).json({
                message: "Username must be between 3 and 20 characters long."
            })
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters long."
            })
        }

        if (name.length < 3 || name.length > 20) {
            return res.status(400).json({
                message: "Name must be between 3 and 40 characters long."
            })
        }
        
        if(existingUser) {
            return res.status(409).json({ message: "Username already taken. Please choose a different username." })
        }
            
        const hashedPassword = await bcrypt.hash(password, 10)

        const userAvatar = avatar !== "" ? 
            avatar
            : "https://i2.wp.com/zubnylekarpodolsky.sk/wp-content/uploads/2013/06/blank_profile.png" 

        const userBio = bio ? 
            bio
            : "Hello 👋, I'm using the Convo app."

        const user = new User({
            name,
            username,
            password: hashedPassword,
            bio : userBio,
            avatar: userAvatar,
        })

        await user.save()
        res.status(201).json({ 
            message: "You've successfully signed up, now you will be redirected to sign in" 
        })
    } catch (error) {
        console.error(error)
        res.status(409).json({ 
            message: "Failed to create user" 
        })
    }
}

const signIn = async (req, res) => {
    const { username, password } = req.body
    const existingUser = await User.findOne({ username })

    if(!existingUser) {
        return res.status(401).json({ message: "Invalid credentials" })
    }

    const isPasswordCorrect = await bcrypt.compare(
        password,
        existingUser.password
    )

    if(!isPasswordCorrect) {
        return res.status(401).json({ message: "Invalid credentials" })
    }

    const payload = {
        id: existingUser._id,
        username: existingUser.username,
    }

    const accessToken = jwt.sign(payload, process.env.SECRET, {
        expiresIn: "6h",
    })

    const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {
        expiresIn: "7d",
    })

    const newRefreshToken = new Token({
        user: existingUser._id,
        refreshToken,
        accessToken,
    })

    await newRefreshToken.save()

    res.status(200).json({
        message: "You've successfully signed in",
        accessToken,
        refreshToken,
        user: {
            _id: existingUser._id,
            name: existingUser.name,
            username: existingUser.username,
            avatar: existingUser.avatar,
            bio: existingUser.bio,
        },
    })
}

const signOut = async (req, res) => {
    try {
        const accessToken = req.headers.authorization?.split(" ")[1] ?? null
        
        if (accessToken) {
            await Token.deleteOne({ accessToken })
        } 
        res.status(200).json({
            message: "Sign out successful",
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
        })
    }
}  

const editProfile = async (req, res) => {
    try {
        const { name, bio, avatar } = req.body
        const userId = req.userId

        if (!name) {
            return res.status(400).json({
                message: "Name must be provided"
            })
        }

        const userAvatar = avatar ? 
        avatar
        : "https://i2.wp.com/zubnylekarpodolsky.sk/wp-content/uploads/2013/06/blank_profile.png" 

        const userBio = bio ? 
            bio
            : "Hello 👋, I'm using the Convo app."

        const updatedUser = await User.findByIdAndUpdate(
            userId, 
            { 
                name, 
                bio: userBio, 
                avatar: userAvatar,
            }, 
            { 
                new: true 
            } 
        )
        .select("username name avatar bio")

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        const payload = {
            id: updatedUser._id,
            username: updatedUser.username,
        }
    
        const accessToken = jwt.sign(payload, process.env.SECRET, {
            expiresIn: "6h",
        })
    
        const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {
            expiresIn: "7d",
        })
    
        const newRefreshToken = new Token({
            user: updatedUser._id,
            refreshToken,
            accessToken,
        })
    
        await newRefreshToken.save()

        const user = {
            _id: updatedUser._id,
            name: updatedUser.name,
            username: updatedUser.username,
            avatar: updatedUser.avatar,
            bio: updatedUser.bio,
        }

        await pusherServer.trigger(userId, "profile:update", user)

        res.status(200).json({
            message: "User updated successfully",
            accessToken,
            refreshToken,
            user,
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

const deleteProfile = async (req, res) => {
    try {
        const userId = req.userId

        const user = await User.findByIdAndDelete(userId)

        if (!user) {
            return res.status(404).json({ 
                message: "User not found"
            })
        }

        await Promise.all([
            Relationship.deleteMany(
                {
                    $or: [
                        { 
                            sender: userId, 
                        },
                        { 
                            receiver: userId 
                        }
                    ]
                },
            ),
            Conversation.deleteMany(
                {
                    $or: [
                        { 
                            user1: userId, 
                        },
                        { 
                            user2: userId 
                        }
                    ]
                },
            )
        ])

        const accessToken = req.headers.authorization?.split(" ")[1] ?? null
        
        if (accessToken) {
            await Token.deleteOne({ accessToken })
        } 

        res.status(200).json({
            message: "Profile deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
}


const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body

        const existingToken = await Token.findOne({ refreshToken })

        if (!existingToken) {
            return res.status(401).json({
                message: "Invalid refresh token",
            })
        }

        const existingUser = await User.findById(existingToken.user)
        if (!existingUser) {
            return res.status(401).json({
                message: "Invalid refresh token",
            })
        }

        const refreshTokenExpiresAt = jwt.decode(existingToken.refreshToken).exp * 1000

        if (Date.now() >= refreshTokenExpiresAt) {
                await existingToken.deleteOne()
                return res.status(401).json({
                message: "Expired refresh token",
            })
        }

        const payload = {
            id: existingUser._id,
            username: existingUser.username,
        }

        
        const accessToken = jwt.sign(payload, process.env.SECRET, {
            expiresIn: "6h",
        })
  
        res.status(200).json({
            accessToken,
            refreshToken: existingToken.refreshToken,
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
        })
    }
} 

module.exports = {
    signUp,
    signIn,
    signOut,
    editProfile,
    deleteProfile,
    refreshToken,
}