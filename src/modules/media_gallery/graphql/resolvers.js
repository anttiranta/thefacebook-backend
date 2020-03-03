// App Imports
const imageProcessor = require('../imageProcessor')
const UserMediaGalleryEntry = require('../model/userMediaGalleryEntry')
const User = require('../../user/model/user')
const authChecker = require('../../auth/authChecker')

// Create
const create = async function (parentValue, { userId, label, content, disabled = false }, context) {
    authChecker.checkIsAllowed(context)
    if (context.auth.user.id !== userId) {
        throw new Error('Operation denied.')
    }

    verifyUserExists(userId)

    const filename = await imageProcessor.addImage(userId, content)
    
    let mediaGalleryData = await UserMediaGalleryEntry.find({user: userId});
    if (mediaGalleryData === undefined) {
        mediaGalleryData = []
    }

    let position = 0
    mediaGalleryData.forEach(entry => {
        if (entry.position && entry.position > position) {
            position = entry.position
        }
    });

    position++
    const mediaGalleryEntry = new UserMediaGalleryEntry({
        file: filename,
        position,
        label,
        disabled,
        mediaType: 'image',
        content,
        user: userId
    })

    return await mediaGalleryEntry.save()
}

// Update
const update = async function (parentValue, { id, userId, label, position, disabled }, context) {
    authChecker.checkIsAllowed(context)
    if (context.auth.user.id !== userId) {
        throw new Error('Operation denied.')
    }

    verifyUserExists(userId)

    let mediaGalleryData = {label}
    if (position !== undefined) 
        mediaGalleryData.position = position
    if (disabled !== undefined)
        mediaGalleryData.disabled = disabled

    return await UserMediaGalleryEntry.findByIdAndUpdate(
        id, 
        mediaGalleryData, 
        { new: true }
    )
}

// Remove
const remove = async function (parentValue, { id, userId }, context) {
    authChecker.checkIsAllowed(context)
    if (context.auth.user.id !== userId) {
        throw new Error('Operation denied.')
    }

    const user = await User.findById(userId)
    if (!user) {
        throw Error('User does not exist.')
    }

    const mediaGalleryEntry = await UserMediaGalleryEntry.findByIdAndDelete(id)
    if (!mediaGalleryEntry) {
        throw Error('No media with the provided ID was found. Verify the ID and try again.')
    }

    user.profilePicture = undefined
    await user.save()

    await imageProcessor.removeImage(mediaGalleryEntry.file)

    return mediaGalleryEntry
}

// Get
const getById = async function (parentValue, { id }, context) {
    authChecker.checkIsAllowed(context)

    const mediaEntry = await UserMediaGalleryEntry.findById(id).populate("user")
    if (mediaEntry) {
        return mediaEntry
    } else {
        throw Error('No media with the provided ID was found. Verify the ID and try again.')
    }
}

// Get list
const getList = async function (parentValue, { userId, disabled = false }, context) {
    authChecker.checkIsAllowed(context)

    verifyUserExists(userId)

    return await UserMediaGalleryEntry.find({user: userId, disabled}).sort('position')
}

const verifyUserExists = async function(userId) {
    const user = await User.findById(userId)
    if (!user) {
        throw Error('User does not exist.')
    }
}

module.exports = {
    create,
    update,
    remove,
    getById,
    getList
}