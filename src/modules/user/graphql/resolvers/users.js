// Imports
const bcrypt = require('bcrypt')

// App Imports
const serverConfig = require('../../../../config/server')
const User = require('../../model/user')
const credentialsValidator = require('../../validator/credentialsValidator')
const authChecker = require('../../../auth/authChecker')
const objectUtils = require('../../../../util/objectUtils')

// Get by ID
const getById = async function(parentValue, {id}, context, {fieldNodes}) {
    authChecker.checkIsAllowed(context)

    const fieldsToPopulate = getFieldsToPopulate(fieldNodes)

    let user = null
    if (fieldsToPopulate.length > 0) {
        user = await User.findById(id).populate(fieldsToPopulate.join(' '))
    } else {
        user = await User.findById(id)
    }
    
    if (user) {
        return user
    }
    throw Error('User does not exist.')
}

// Get by Username
const getByUsername = async function(parentValue, {username}, context, {fieldNodes}) {
    authChecker.checkIsAllowed(context)

    const fieldsToPopulate = getFieldsToPopulate(fieldNodes)

    let user = null
    if (fieldsToPopulate.length > 0) {
        user = await User.findOne({username}).populate(fieldsToPopulate.join(' '))
    } else {
        user = await User.findOne({username})
    }
    
    if (user) {
        return user
    }
    throw Error('User does not exist.')
}

// Get list
const getList = async function(parentValue, params, context) {
    authChecker.checkIsAllowed(context)

    if (objectUtils.isEmpty(params)) {
        return await User.find({}).populate('profilePicture')
    }
    return await User.find(params).populate('profilePicture')
}

// Create
const createNew = async function(parentValue, { name, email, password, username, status }) {
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
        status,
        memberSince: Date.now()
    })

    return await user.save()
}

// Update
const update = async function(parentValue, params, context) {
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
const remove = async function(parentValue, { id }, context) {
    authChecker.checkIsAllowed(context)

    if (context.auth.user.id !== id) {
        throw new Error('Operation denied.')
    }
    return await User.findByIdAndDelete(id)
}

// Create hash of password
const createPasswordHash = async (password) => {
    return await bcrypt.hash(password, serverConfig.saltRounds)
}

// Resolve fields in need of population
const getFieldsToPopulate = (fieldNodes) => {
    let fields = []

    if (fieldNodes[0].selectionSet.selections) {
        fieldNodes[0].selectionSet.selections.forEach(selection => {
            if(['friends', 'profilePicture'].includes(selection.name.value)) {
                fields.push(selection.name.value)
            }
        });
    }
    return fields
}

module.exports = {
    createNew,
    update,
    getById,
    getByUsername,
    getList,
    remove
}  