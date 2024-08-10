const router = require("express").Router()
const passport = require("passport")

const { 
    getFriends,
    getNewFriendsList, 
    sendFriendRequest,
    removeFriend,
    searchFriends,
    getAllFriendRequests,
    rejectFriendRequest,
    acceptFriendRequest,
    blockFriend,
    unblockFriend,
} = require("../controllers/friends.controller")
const decodeToken = require("../middlewares/decodeToken")

router.use(passport.authenticate("jwt", { session: false }, null), decodeToken)

router.get("/", getFriends)
router.get("/add", getNewFriendsList)
router.get("/requests", getAllFriendRequests)
router.get("/search", searchFriends)

router.patch("/remove/:id", removeFriend)
router.patch("/block/:id", blockFriend)
router.patch("/request/:id", acceptFriendRequest)

router.post("/request/:id", sendFriendRequest)

router.delete("/request/:id", rejectFriendRequest)
router.delete("/unblock/:id", unblockFriend)

module.exports = router