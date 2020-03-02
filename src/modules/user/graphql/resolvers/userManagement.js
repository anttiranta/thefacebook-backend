// Imports
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// App Imports
const serverConfig = require('../../../../config/server')
const User = require('../../model/user')
const UserMediaGalleryEntry = require('../../../media_gallery/model/userMediaGalleryEntry')
const authChecker = require('../../../auth/authChecker')

// Login
const authenticate = async function(parentValue, { username, password }) {
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

// Set profile picture
const setProfilePicture = async function(parentValue, { userId, userMediaGalleryEntryId }, context) {
    authChecker.checkIsAllowed(context)
    if (context.auth.user.id !== userId) {
        throw new Error('Operation denied.')
    }
    
    const user = await User.findById(userId)
    const entry = await UserMediaGalleryEntry.findById(userMediaGalleryEntryId)
    if (!user || !entry) {
        throw new Error('Either user or entry ID is invalid.')
    }

    return await User.findByIdAndUpdate(userId, { profilePicture: entry }, { new: true })
}

module.exports = {
    authenticate,
    setProfilePicture
}  