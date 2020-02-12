// App Imports
const imageProcessor = require('../imageProcessor')
//const UserMediaGalleryEntry = require('../model/userMediaGalleryEntry').UserMediaGalleryEntry

// Create
const create = async function (parentValue, { userId, label, types, content }, context) {
    authChecker.checkIsAllowed(context)

    if (context.auth.user.id !== userId) {
        throw new Error('Operation denied.')
    }

    const filename = await imageProcessor.processImageContent(userId, content)
    // TODO!
}

// Update
const update = async function (parentValue, { id, userId, label, file, content }, context) {
    authChecker.checkIsAllowed(context)

    if (context.auth.user.id !== userId) {
        throw new Error('Operation denied.')
    }

    // TODO!
}

// Remove
const remove = async function (parentValue, { id, userId }, context) {
    authChecker.checkIsAllowed(context)

    if (context.auth.user.id !== userId) {
        throw new Error('Operation denied.')
    }

    // TODO!
}

// Get
const getById = async function (parentValue, { id }, context) {
    authChecker.checkIsAllowed(context)

    const user = await User.findById(id)
    if (user) {
        return user
    } else {
        throw Error('User does not exist.')
    }
}

// Get list
const getList = async function (parentValue, { userId }, context) {
    authChecker.checkIsAllowed(context)

    // TODO!
}

module.exports = {
    create,
    update,
    remove,
    getById,
    getList
}