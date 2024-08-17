import express from 'express'
import Blog from '../models/blog.js'
import logger from '../utils/logger.js'

const blogRouter = express.Router()

blogRouter.get('/', (request, response, next) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
        .catch(error => {
            logger.error('Error fetching blog lis')
            next(error)
        })
})

blogRouter.post('/', (request, response, next) => {
    const blog = new Blog(request.body)

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
        .catch(error => {
            logger.error('Error creating new blog post')
            next(error)
        })
})

export default blogRouter