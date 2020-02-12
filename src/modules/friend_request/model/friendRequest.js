// Imports
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

// Constants
const STATUS_PENDING = 'Pending'
const STATUS_ACCEPTED = 'Accepted'
const STATUS_DECLINED = 'Declined'

// Schema
const friendRequestSchema = mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    status: {
        type: String,
        enum: [STATUS_PENDING, STATUS_ACCEPTED, STATUS_DECLINED],
        default: STATUS_PENDING
    }
}, 
{
    timestamps: true, "strict": false
})

friendRequestSchema.plugin(uniqueValidator)
friendRequestSchema.index({ "creator": 1, "receiver": 1}, { "unique": true });

friendRequestSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.status
    }
})

const FriendRequest = mongoose.model('FriendRequest', friendRequestSchema)

module.exports = {
    FriendRequest,
    STATUS_PENDING, 
    STATUS_ACCEPTED, 
    STATUS_DECLINED
}