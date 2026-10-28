require('dotenv').config()

const mongoUri = process.env.MONGODB_URI
const PORT = process.env.PORT

module.exports = { mongoUri, PORT }
