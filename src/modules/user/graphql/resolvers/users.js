// Imports
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// App Imports
const serverConfig = require('../../../../config/server')
const User = require('../../model/user')
const credentialsValidator = require('../../validator/credentialsValidator')
const authChecker = require('../../../auth/authChecker')

// Create
const createNew = async function create(parentValue, { name, email, password, username }) {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
        throw new Error(`The email ${email} is already registered. Please try to login.`)
    }

    if (password === undefined || password === '') {
        throw new Error('Password is missing.')
    }

    credentialsValidator.checkPasswordStrength(password)
    credentialsValidator.checkPasswordDifferentFromEmail(email, password)

    const passwordHash = await createPasswordHash(password)

    const user = new User({
        name,
        email,
        username,
        passwordHash,
    })

    return await user.save()
}

// Get by ID
const getById = async function getById(parentValue, { id }, context) {
    authChecker.checkIsAllowed(context)

    const user = await User.findById(id)
    if (user) {
        return user
    } else {
        throw Error('User does not exist.')
    }
}

// Get all
const getAll = async function getAll() {
    return await User.find({});
}

// Delete
const remove = async function remove(parentValue, { id }) {
    authChecker.checkIsAllowed(context)

    // TODO: check rights to delete this user
    return await User.findByIdAndDelete(id)
}

const createPasswordHash = async (password) => {
    return await bcrypt.hash(password, serverConfig.saltRounds)
}

module.exports = {
    createNew,
    getById,
    getAll,
    remove
}  