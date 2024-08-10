require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
const Database = require("./config/database")
const userRoutes = require("./routes/user.route")
const friendRoutes = require("./routes/friends.route.js")
const conversationRoutes = require("./routes/conversations.route.js")
const passport = require("passport")
const PORT = process.env.PORT || 4000

const database = new Database(process.env.MONGODB_URI)

database.connect().catch((error) => {
  console.error("Error connecting to database:", error)
})

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(passport.initialize())
require("./config/passport.js")

app.use("/api/users", userRoutes)
app.use("/api/friends", friendRoutes)
app.use("/api/conversations", conversationRoutes)

process.on("SIGINT", async () => {
  try {
    await database.disconnect()
    console.log("Disconnected from database.")
    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
})

app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`)
})
