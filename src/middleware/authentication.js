// Imports
const jwt = require('jsonwebtoken')

// App Imports
const serverConfig = require('./../config/server.json')

// Authentication middleware
module.exports = function (request, response, next) {
    const authorization = request.get('authorization')

    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        try {
            const token = authToken.split(' ')
            request.user = jwt.verify(token[1], serverConfig.secret)
        } catch (e) {
            console.warn('Invalid token detected.')
        }
    } else {
        request.user = {}
    }
    next()
}