// Imports
const bcrypt = require('bcrypt')

// App Imports
const serverConfig = require('../../../../config/server')
const User = require('../../model/user')
const credentialsValidator = require('../../validator/credentialsValidator')
const authChecker = require('../../../auth/authChecker')
const objectUtils = require('../../../../util/objectUtils')

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

// Get by Username
const getByUsername = async function getByUsername(parentValue, { username }, context) {
    authChecker.checkIsAllowed(context)

    const user = await User.findOne({username})
    if (user) {
        return user
    } else {
        throw Error('User does not exist.')
    }
}

// Get list
const getList = async function getList(parentValue, params, context) {
    authChecker.checkIsAllowed(context)

    if (objectUtils.isEmpty(params)) {
        return await User.find({});
    }
    return await User.find(params);
}

// Create
const createNew = async function create(parentValue, { name, email, password, username, relationship }) {
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
        relationship,
        memberSince: Date.now()
    })

    return await user.save()
}

const update = async function update(parentValue, params, context) {
    authChecker.checkIsAllowed(context)

    if (!params.id || params.id <= 0) {
        throw new Error('Identifier is missing.')
    }
    if (context.auth.user.id !== params.id) {
        throw new Error('Operation denied.')
    }

    return await User.findByIdAndUpdate(params.id, { email, status, gender, year, 
        concentation, lookingFor, interestedIn, relationship, politicalView, 
        interests } = params, { new: true })
}


// Delete
const remove = async function remove(parentValue, { id }, context) {
    authChecker.checkIsAllowed(context)

    if (context.auth.user.id !== id) {
        throw new Error('Operation denied.')
    }
    return await User.findByIdAndDelete(id)
}

const createPasswordHash = async (password) => {
    return await bcrypt.hash(password, serverConfig.saltRounds)
}

module.exports = {
    createNew,
    update,
    getById,
    getByUsername,
    getList,
    remove
}  