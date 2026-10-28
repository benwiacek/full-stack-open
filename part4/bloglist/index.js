const express = require('express')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const config = require('./utils/config')
const blogRouter = require('./controllers/blogs')
const {
  requestLogger,
  unknownEndpoint,
  errorHandler,
} = require('./utils/middleware')

const app = express()

mongoose
  .connect(config.mongoUri, { family: 4 })
  .then(() => logger.info('connected to MongoDb'))
  .catch((error) =>
    logger.error('There was an error connecting to the DB:', error),
  )

app.use(express.json())
app.use(requestLogger)

app.use('/api/blogs', blogRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
