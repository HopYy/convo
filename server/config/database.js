const mongoose = require("mongoose")
class Database {
    constructor(uri) {
        this.uri = uri
    }

    async connect() {
        try {
            await mongoose.connect(this.uri)
            console.log(`Connected to database: ${mongoose.connection.db.databaseName}`)
        } catch (error) {
            console.error("DATABASE CONNECT ERROR: ", error)
        }
    }

    async disconnect() {
        try {
            await mongoose.disconnect()
            console.log(`Disconnected from database: ${mongoose.connection.db.databaseName}`)
        } catch (error) {
            console.error("DATABASE DISCONNECT ERROR: ", error)
        }
    }
}

module.exports = Database