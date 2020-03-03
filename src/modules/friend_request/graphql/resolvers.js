// App Imports
const FriendRequest = require('../model/friendRequest').FriendRequest
const User = require('../../user/model/user')
const authChecker = require('../../auth/authChecker')
const STATUS_PENDING = require('../model/friendRequest').STATUS_PENDING
const STATUS_ACCEPTED = require('../model/friendRequest').STATUS_ACCEPTED
const STATUS_DECLINED = require('../model/friendRequest').STATUS_DECLINED

const getPendingFriendRequests = async function getList(parentValue, { creator, receiver }, context) {
    authChecker.checkIsAllowed(context)

    if (context.auth.user.id === creator) {
        return await FriendRequest.find({
            creator, status: STATUS_PENDING
        }).populate('receiver').populate('creator', 'id')
    } else if (context.auth.user.id === receiver) {
        return await FriendRequest.find({
            receiver, status: STATUS_PENDING
        }).populate({
            path: 'creator',
            populate: { path: 'profilePicture' }
        })
        .populate('receiver', 'id')
    } else {
        throw new Error('Operation denied.')
    }
}

const createNew = async function (parentValue, { creator, receiver }, context) {
    authChecker.checkIsAllowed(context)

    if (context.auth.user.id !== creator) {
        throw new Error('Operation denied.')
    }

    const existingFriendRequest = await FriendRequest.findOne({
        creator, receiver
    })
    if (existingFriendRequest) {
        throw new Error(`You have already sent friend request for this user.`)
    }

    const creatorObject = await User.findById(creator)
    const receiverObject = await User.findById(receiver)
    if (!creatorObject || !receiverObject) {
        throw new Error(`Either creator or receiver ID is invalid.`)
    }

    if (creatorObject.friends.includes(receiverObject._id)) {
        throw new Error(`You are already friends with this user.`)
    }

    const friendRequest = new FriendRequest({
        creator: creatorObject._id,
        receiver: receiverObject._id,
        status: STATUS_PENDING
    })

    return await friendRequest.save() 
}

const acceptFriendRequest = async function (parentValue, { creator, receiver }, context) {
    authChecker.checkIsAllowed(context)

    if (context.auth.user.id !== receiver) {
        throw new Error('Operation denied.')
    }
    if (!creator || !receiver) {
        throw new Error('Missing receiver or creator ID.')
    }

    return await update(creator, receiver, STATUS_ACCEPTED)
}

const declineFriendRequest = async function (parentValue, { creator, receiver }, context) {
    authChecker.checkIsAllowed(context)

    if (context.auth.user.id !== receiver) {
        throw new Error('Operation denied.')
    }
    if (!creator || !receiver) {
        throw new Error('Missing receiver or creator ID.')
    }

    return await update(creator, receiver, STATUS_DECLINED)
}

const update = async function (creator, receiver, status) {
    const friendRequest = await FriendRequest.findOne({
        creator, receiver, 'status': STATUS_PENDING
    })
    if (!friendRequest) {
        throw Error('This friend request does not exist.')
    }

    const creatorObject = await User.findById(creator)
    const receiverObject = await User.findById(receiver)
    if (!creatorObject || !receiverObject) {
        throw new Error(`Either creator or receiver ID is invalid.`)
    }

    if (!canChangeFriendStatus(creatorObject, receiverObject)) {
        throw Error('You are already friends.')
    }

    try {
        if (status === STATUS_ACCEPTED) {
            creatorObject.friends = creatorObject.friends.concat(receiverObject._id)
            receiverObject.friends = receiverObject.friends.concat(creatorObject._id)
            await creatorObject.save()
            await receiverObject.save()
        }
        return await FriendRequest.findByIdAndUpdate(friendRequest._id, { status }, { new: true })
    } catch (exception) {
        console.exception('Updating friend request failed: ', exception)
        throw new Error('Something went wrong while saving changes. Please contact website adminstrator.')
    }
}

const canChangeFriendStatus = function (creator, receiver) {
    if (creator.friends.find(friendId => friendId === receiver._id)) {
        return false
    }
    if (receiver.friends.find(friendId => friendId === creator._id)) {
        return false
    }
    return true
}

module.exports = {
    createNew,
    acceptFriendRequest,
    declineFriendRequest,
    getPendingFriendRequests,
}  