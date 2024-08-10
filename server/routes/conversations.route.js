const router = require("express").Router()
const passport = require("passport")

const { 
    getConversations,
    getSelectedConversation,
    sendMessage,
    editMessage,
    deleteMessage,
    seenMessage,
    clearConversation,
    getNewestConversation,
} = require("../controllers/conversations.controller")
const decodeToken = require("../middlewares/decodeToken")

router.use(passport.authenticate("jwt", { session: false }, null), decodeToken)

router.get("/", getConversations)
router.get("/:id", getSelectedConversation)
router.get("/new/:id", getNewestConversation)

router.post("/message/send/:id", sendMessage)

router.patch("/message/edit/:id", editMessage)
router.patch("/clear/:id", clearConversation)
router.patch("/message/seen/:id", seenMessage)

router.delete("/message/delete/:id", deleteMessage)

module.exports = router
