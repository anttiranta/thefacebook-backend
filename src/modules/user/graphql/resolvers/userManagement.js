// Imports
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// App Imports
const serverConfig = require('../../../../config/server')
const User = require('../../model/user')

// Login
const authenticate = async function authenticate(parentValue, { username, password }) {
    if (password === undefined || password === '') {
        throw new Error('Password is missing.')
    }

    const user = await User.findOne({ username })

    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        throw new Error('Invalid login or password.')
    }

    const userDetailsToken = {
        id: user._id,
        username: user.username,
        email: user.email
    }

    return {
        user: user,
        token: jwt.sign(userDetailsToken, serverConfig.secret)
    }
}

module.exports = {
    authenticate
}  