const User = require("../models/user.model")
const Relationship = require("../models/relationship.model")

const getFriendIds = async (userId) => {
    try {
        const relationships = await Relationship.find({
            $or: [
                {
                    sender: userId
                },
                {
                    receiver: userId
                }
            ],
            status: "accepted"
        })
        .populate("sender receiver")

        const friendIds = relationships.map((relationship) =>
            relationship.sender.equals(userId) ? relationship.receiver : relationship.sender
        )

        return friendIds
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

const getFriends = async (req, res) => {
    try {
        const userId = req.userId

        const friendIds = await getFriendIds(userId)

        const friends = await User.find({
            _id: {
                $in: friendIds,
            }
        })
        .select("username name avatar bio")

        res.status(200).json(friends)
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

const getNewFriendsList = async (req, res) => {
    try {
        const userId = req.userId

        const user = await User.findById(userId)

        if (!user) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }

        const friendsIds = await getFriendIds(userId)

        const relationships = await Relationship.find({
            $or: [
                {
                    sender: userId
                },
                {
                    receiver: userId
                }
            ]
        })

        const relationshipIds = relationships.map((request) =>
            request.sender.equals(userId) ? request.receiver : request.sender
        )

        const newFriends = await User.find({
            username: { $ne: user.username },
            _id: {
                $nin: [
                    ...friendsIds,
                    ...relationshipIds
                ]
            }
        })
        .limit(20)
        .select("username name avatar bio")

        res.status(200).json(newFriends)
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

const getAllFriendRequests = async (req, res) => {
    try {
        const userId = req.userId

        const relationships = await Relationship.find({
            receiver: userId,
            status: "pending"
        })
        .sort({ createdAt: -1 })
        .populate({
            path: "sender",
            select: "username name avatar bio"
        })

        res.status(200).json(relationships)
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

const sendFriendRequest = async (req, res) => {
    try {
        const userId = req.userId
        const friendId = req.params.id

        if (userId === friendId) {
            return res.status(400).json({
                message: "You cannot send a friend request to yourself"
            })
        }

        const friend = await User.findById(friendId)

        if (!friend) {
            return res.status(404).json({
                message: "User does not exist"
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
                    receiver: userId,
                }
            ]
        })

        if (relationship) {
            return res.status(400).json({
                message: "Friend request already exist"
            })
        }

        const newFriendRequest = new Relationship({
            sender: userId,
            receiver: friendId,
        })

        await newFriendRequest.save()

        res.status(200).json({
            message: "Friend request sent successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

const acceptFriendRequest = async (req, res) => {
    try {
        const friendId = req.params.id
        const userId = req.userId

        const friendRequest = await Relationship.findOne({
            sender: friendId,
            receiver: userId,
            status: "pending"
        })

        if (!friendRequest) {
            return res.status(400).json({
                message: "Friend request does not exist"
            })
        }

        await Promise.all([
            User.findByIdAndUpdate(
                userId,
                {
                    $addToSet: {
                        friends: friendId
                    }
                }
            ),
            User.findByIdAndUpdate(
                friendId,
                {
                    $addToSet: {
                        friends: userId
                    }
                }
            ),
            Relationship.findByIdAndUpdate(
                friendRequest._id,
                {
                    status: "accepted"
                }
            )
        ])

        const requests = await Relationship.find({
            receiver: userId,
            status: "pending"
        })
        .sort({ createdAt: -1 })
        .populate({
            path: "sender",
            select: "username name avatar bio"
        })

        res.status(200).json(requests)
    } catch (error) {
        res.status(500).json({
            message: "Server error",
        })
    }
}

const rejectFriendRequest = async (req, res) => {
    try {
        const friendId = req.params.id
        const userId = req.userId

        const friendRequest = await Relationship.exists({
            sender: friendId,
            receiver: userId
        })

        if (!friendRequest) {
            return res.status(400).json({
                message: "Friend request does not exist"
            })
        }

        await Relationship.deleteOne({
            sender: friendId,
            receiver: userId
        })

        const requests = await Relationship.find({
            receiver: userId,
            status: "pending"
        })
        .sort({ createdAt: -1 })
        .populate({
            path: "sender",
            select: "username name avatar bio"
        })

        res.status(200).json(requests)
    } catch (error) {
        res.status(500).json({
            message: "Server error",
        })
    }
}

const removeFriend = async (req, res) => {
    try {
        const friendId = req.params.id
        const userId = req.userId

        const relationship = await Relationship.findOneAndDelete({
            $or: [
                {
                    sender: userId,
                    receiver: friendId
                },
                {
                    sender: friendId,
                    receiver: userId
                }
            ]
        })

        if (!relationship) {
            return res.status(404).json({
                message: "Relationship not found"
            })
        }

        res.status(200).json(friendId)
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

const blockFriend = async (req, res) => {
    try {
        const friendId = req.params.id
        const userId = req.userId

        const relationship = await Relationship.findOneAndUpdate(
            {
                $or: [
                    {
                        sender: userId,
                        receiver: friendId
                    },
                    {
                        sender: friendId,
                        receiver: userId
                    }
                ]
            },
            {
                $set: {
                    status: "blocked"
                }
            },
            {
                new: true
            }
        )

        if (!relationship) {
            await Relationship.create({
                sender: userId,
                receiver: friendId,
                status: "blocked"
            })
        }

        return res.status(200).json(friendId)
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

const unblockFriend = async (req, res) => {
    try {
        const friendId = req.params.id
        const userId = req.userId

        const relationship = await Relationship.findOneAndDelete(
            {
                $or: [
                    {
                        sender: userId,
                        receiver: friendId,
                    },
                    {
                        sender: friendId,
                        receiver: userId,
                    }
                ],
                status: "blocked"
            }
        )

        if (!relationship) {
            return res.status(404).json({
                message: "Relationship not found"
            })
        }

        res.status(200).json({
            message: "Relationship is unblocked",
            friendId
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

const searchFriends = async (req, res) => {
    try {
        const searchValue = req.query.q
        const userId = req.userId

        if (!searchValue) {
            return res.status(200).json(null)
        }

        const relationships = await Relationship.find({
            $or: [
                {
                    sender: userId
                },
                {
                    receiver: userId
                }
            ]
        })

        const friendIds = relationships.filter((relationship) => relationship.status === "accepted")
        .map((relationship) => relationship.sender.equals(userId) ? relationship.receiver : relationship.sender )

        const blockedIds = relationships.filter((relationship) => relationship.status === "blocked")
        .map((relationship) => relationship.sender.equals(userId) ? relationship.receiver : relationship.sender )

        const requestIds = relationships.filter((relationship) => relationship.status === "pending" && relationship.receiver.equals(userId))
        .map((relationship) => relationship.sender)

        const pendingIds = relationships.filter((relationship) => relationship.status === "pending" && relationship.sender.equals(userId))
        .map((relationship) => relationship.receiver)

        const nonFriendsIds = [userId, ...friendIds, ...blockedIds, ...requestIds, ...pendingIds]

        const [friends, requests, pendings, blocked, nonFriends] = await Promise.all([
            User.find({
                _id: {
                    $in: friendIds
                },
                username: {
                    $regex: searchValue,
                    $options: 'i'
                }
            }).select("name username avatar bio"),

            User.find({
                _id: {
                    $in: requestIds
                },
                username: {
                    $regex: searchValue,
                    $options: 'i'
                }
            }).select("name username avatar bio"),

            User.find({
                _id: {
                    $in: pendingIds
                },
                username: {
                    $regex: searchValue,
                    $options: 'i'
                }
            }).select("name username avatar bio"),

            User.find({
                _id: {
                    $in: blockedIds
                },
                username: {
                    $regex: searchValue,
                    $options: 'i'
                }
            }).select("name username avatar bio"),

            User.find({
                _id: {
                    $nin: nonFriendsIds
                },
                username: {
                    $regex: searchValue,
                    $options: 'i'
                }
            }).select("name username avatar bio"),
        ])

        return res.status(200).json({ 
            friends, 
            requests, 
            pendings, 
            blocked, 
            nonFriends 
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        })
    }

}

module.exports = {
    getFriends,
    getNewFriendsList,
    getAllFriendRequests,
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    removeFriend,
    blockFriend,
    unblockFriend,
    searchFriends,
}