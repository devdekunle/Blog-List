import logger from './logger.js'

const errorHandler = (error, request, response, next) => {
    logger.info(error.message)
    if (error.name === 'CastError') {
        response.status(400).json({ error: error.message })
    }
    if (error.name === 'ValidationError') {
        response.status(400).json({ error: error.message })
    }
    next(error)
}

const unKnownEndpoint = (request, response) => {
    return response.status(404).json({ error: 'Unknown endpoint' })
}

export default { errorHandler, unKnownEndpoint }