import express from 'express'
import blogRouter from './Controller/router.js'
import cors from 'cors'
import middleware from './utils/middleware.js'
import mongoose from 'mongoose'
import config from './utils/config.js'
import logger from './utils/logger.js'

mongoose.set('strictQuery', false)
try {
    await mongoose.connect(config.MONGODB_URI)
    logger.info('Connected to MONGODB')
} catch(error) {
    logger.error('Error connecting to MONGODB', error.message)
}

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('dist'))
app.use('/api/blogs', blogRouter)
app.use(middleware.errorHandler)
app.use(middleware.unKnownEndpoint)

export default app