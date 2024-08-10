const router = require("express").Router()
const passport = require("passport")

const decodeToken = require("../middlewares/decodeToken")
const requireAuth = passport.authenticate("jwt", { session: false }, null)

const {
    signUp,
    signIn,
    signOut,
    editProfile,
    deleteProfile,
    refreshToken
} = require("../controllers/user.controller")

router.post("/refresh-token", refreshToken)
router.post("/sign-up", signUp)
router.post("/sign-in", signIn)
router.post("/sign-out", signOut)

router.patch("/edit", requireAuth, decodeToken, editProfile)

router.delete("/delete", requireAuth, decodeToken, deleteProfile)


module.exports = router