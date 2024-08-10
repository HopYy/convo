const Message = require("../models/message.model")
const Relationship = require("../models/relationship.model")
const User = require("../models/user.model")
const Conversation = require("../models/conversation.model")
const formatCreatedAt = require("../utils/formatCreatedAt")
const groupMessages = require("../utils/groupMessages")
const pusherServer = require("../utils/pusher")

const getConversations = async (req, res) => {
    try {
        const userId = req.userId

        const relationships = await Relationship.find({
            $or: [
                {
                    sender: userId,
                },
                {
                    receiver: userId
                }
            ],
            status: "accepted"
        })

        if (!relationships.length) {
            return res.status(200).json({
                message: "You dont have any friends"
            })
        }

        const conversationIds = relationships.map(rel => rel.conversation)

        const conversations = await Conversation.find({
            _id: {
                $in: conversationIds
            },
            messages: {
                $not: {
                    $size: 0
                }
            },
        })
        .sort({ updatedAt: -1 })
        .limit(20)
        .populate({
            path: "messages",
            select: "body media seen sender receiver createdAt"
        })
        
        if (!conversations.length) {
            return res.status(200).json({
                message: "You have no conversations"
            })
        }

        const friendIds = conversations.map(convo =>
            convo.user1.equals(userId) ? convo.user2 : convo.user1
        )

        const friends = await User.find({
            _id: {
                $in: friendIds
            }
        })
        .lean()
        .select("username name avatar bio")

        const friendMap = new Map(friends.map(friend => [friend._id.toString(), friend]))

        const groupedMessages = conversations.map(conversation => groupMessages(conversation.messages))

        const lastGroupMessages = groupedMessages.map((groups) => groups[groups.length - 1])

        const lastMessages = lastGroupMessages.map(group => group[group.length - 1])

        const conversationsData = conversations.map((convo, index) => {
            const friendId = convo.user1.equals(userId) ? convo.user2 : convo.user1
            const friend = friendMap.get(friendId.toString())
            const lastMessage = {
                ...lastMessages[index].toObject(),
                createdAt: formatCreatedAt(lastMessages[index].createdAt)
            }

            return {
                _id: convo._id,
                friend,
                lastMessage,
            }
        })  

        return res.status(200).json(conversationsData)
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

const getSelectedConversation = async (req, res) => {
    try {
        let conversation
        const friendId = req.params.id
        const userId = req.userId

        const friend = await User.findById(friendId)
        .select("username name avatar bio")

        if (!friend) {
            return res.status(404).json({
                message: "Friend not found"
            })
        }

        const relationship = await Relationship.findOne({
            $or: [
                {
                    sender: userId,
                    receiver: friendId
                },
                {
                    sender: friendId,
                    receiver: userId
                }
            ],
            status: "accepted"
        })

        if (!relationship) {
            return res.status(404).json({
                message: `You are no longer friends with ${friend.name}`
            })
        }

        if (!relationship.conversation) {
            conversation = await Conversation.create({
                user1: relationship.sender,
                user2: relationship.receiver,
            })
            relationship.conversation = conversation._id
            await relationship.save()
        } else {
            conversation = await Conversation.findById(relationship.conversation._id)
            .populate({
                path: "messages",
                select: "sender body media seen createdAt"
            })
            .lean()
        }

        const seenMessageIds = conversation.messages
        .filter(message => message.sender.equals(friend._id) && !message.seen)
        .map(message => message._id)

        await Message.updateMany(
            {
                _id: {
                    $in: seenMessageIds
                }
            },
            {
                seen: true
            }
        )

        const groupedMessages = groupMessages(conversation.messages)

        const formatMessages = groupedMessages.map((groups) => (
            groups.map((message) => ({
                ...message,
                createdAt: formatCreatedAt(message.createdAt)
            }))
        ))

        res.status(200).json({
            _id: conversation._id,
            messages: formatMessages,
            friend,
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
        })
    }
}

const sendMessage = async (req, res) => {
    try {
        const conversationId = req.params.id
        const userId = req.userId
        const { body, media } = req.body

        if (!body && !media) {
            return res.status(400).json({
                message: "Either body or media must be provided"
            })
        }

        const conversation = await Conversation.findById(conversationId)
        .populate({
            path: "messages",
            select: "sender"
        })

        if (!conversation) {
            return res.status(500).json({
                message: "Conversation not found"
            })
        }

        const receiver = conversation.user1.equals(userId) ? conversation.user2 : conversation.user1

        const newMessage = await Message.create({
            sender: userId,
            receiver,
            body,
            media,
            seen: false,
        })

        conversation.messages.push(newMessage._id)

        await conversation.save()

        const formatCreatedAtMessages = {
            ...newMessage.toObject(),
            createdAt: formatCreatedAt(newMessage.createdAt)
        }

        await pusherServer.trigger(conversationId, 'message:new', formatCreatedAtMessages)

        res.status(200).json({
            message: "Message sent successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
        })
    }
}

const editMessage = async (req, res) => {
    try {
        const messageId = req.params.id
        const userId = req.userId
        const { body, media } = req.body

        if (!body && !media) {
            return res.status(400).json({
                message: "Either body or media must be provided"
            })
        }

        const message = await Message.findById(messageId)

        if (!message) {
            return res.status(404).json({
                message: "Message not found"
            })
        }

        if (!message.sender.equals(userId)) {
            return res.status(403).json({
                message: "Only the sender can edit their own messages"
            })
        }

        message.body = body
        message.media = media

        await message.save()

        const conversation = await Conversation.findOne({
            messages: messageId
        },)

        await pusherServer.trigger(conversation._id.toString(), "message:edit", message)

        res.status(200).json({
            message: "Message edited successfully",
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
        })
    }
}

const deleteMessage = async (req, res) => {
    try {
        const messageId = req.params.id

        const message = await Message.findByIdAndDelete(messageId)

        if (!message) {
            return res.status(404).json({
                message: "Message not found"
            })
        }

        const conversation = await Conversation.findOneAndUpdate(
            {
                messages: messageId
            },
            {
                $pull: {
                    messages: messageId
                }
            },
            {
                new: true
            }
        )

        if (!conversation) {
            return res.status(404).json({
                message: "Conversation not found"
            })
        }

        await pusherServer.trigger(conversation._id.toString(), "message:delete", message)

        res.status(200).json({
            message: "Message deleted successfully"
        })
    } catch (error) {
        console.error(error)
        res.status(404).json({
            message: "Internal server error",
        })
    }
}

const seenMessage = async (req, res) => {
    try {
        const conversationId = req.params.id
        const userId = req.userId

        const conversation = await Conversation.findById(conversationId)

        if (!conversation) {
            return res.status(404).json({
                message: "Conversation not found"
            })
        }

        if (!conversation.messages.length) {
            return res.status(200).json({
                message: "No messages in the conversation"
            });
        }

        const lastMessageId = conversation.messages[conversation.messages.length - 1]

        const lastMessage = await Message.findById(lastMessageId)
        .select("body media sender seen createdAt")

        if (!lastMessage) {
            return res.status(404).json({
                message: "Message not found"
            });
        }

        const isUserSender = lastMessage.sender.equals(userId)

        if (!isUserSender) {
            lastMessage.seen = true
            await lastMessage.save()
        }

        const formatCreatedAtMessages = {
            ...lastMessage.toObject(),
            createdAt: formatCreatedAt(lastMessage.createdAt)
        }

        await pusherServer.trigger(conversationId, "message:update", formatCreatedAtMessages)

        res.status(200).json({
            message: "Message has been updated"
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
        })
    }
}

const clearConversation = async (req, res) => {
    try {
        const conversationId = req.params.id

        const conversation = await Conversation.findById(conversationId)

        if (!conversation) {
            return res.status(500).json({
                message: "Conversation not found"
            })
        }

        await Message.deleteMany({
            _id: {
                $in: conversation.messages
            }
        })

        conversation.messages = []

        await conversation.save()

        res.status(200).json(conversation)
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
        })
    }
}

const getNewestConversation = async (req, res) => {
    try {
        const conversationId = req.params.id
        const userId = req.userId

        const conversation = await Conversation.findById(conversationId)
        .populate("messages")
        
        if(!conversation) {
            return res.status(404).json({
                message: "Conversation not found"
            })
        }

        const user = await User.findById(userId)
        .populate("username name avatar bio")

        if(!user) {
            return res.status(404).json({
                message: "Friend not found"
            })
        }

        const lastMessage = conversation.messages[conversation.messages.length - 1]

        const conversationData = {
            _id: conversation._id,
            friend: user,
            lastMessage: {
                ...lastMessage.toObject(),
                createdAt: formatCreatedAt(lastMessage.createdAt)
            },
        }

        const users = [conversation.user1, conversation.user2]

        users.map((user) => {
            pusherServer.trigger(user.toString(), "conversation:update", conversationData)
        })

        return res.status(200).json(conversationData)
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
        })
    }
}

module.exports = {
    getConversations,
    getSelectedConversation,
    sendMessage,
    editMessage,
    deleteMessage,
    seenMessage,
    clearConversation,
    getNewestConversation,
}