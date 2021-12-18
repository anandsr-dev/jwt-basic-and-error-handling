require('dotenv')
const jwt = require('jsonwebtoken')
const { Unauthorized } = require('../errors')

const authenticationMiddleware = (req, res, next) => {

    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer'))
        throw new Unauthorized('No token present. Access denied')

    const token = authHeader.split(' ')[1]
    try {
        const { id, username } = jwt.verify(token, process.env.JWT_SECRET)
        req.user = { id, username }
        next()
    } catch (error) {
        throw new Unauthorized('Not authorized to access this route')
    }
}

module.exports = authenticationMiddleware