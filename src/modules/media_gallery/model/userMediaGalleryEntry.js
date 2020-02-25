// Imports
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const imageContentSchema = {
    base64EncodedData: {
        type: String
    },
    mimeType: {
        type: String
    },
    name: {
        type: String
    }
}

const userMediaGalleryEntrySchema = mongoose.Schema({
    label: {
        type: String,
        required: true
    },
    position: {
        type: Number,
        required: true
    },
    disabled: {
        type: Boolean,
        default: false,
        required: true
    },
    mediaType: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: true
    },
    content: imageContentSchema,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
})

userMediaGalleryEntrySchema.plugin(uniqueValidator)

userMediaGalleryEntrySchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const UserMediaGalleryEntry = mongoose.model('UserMediaGalleryEntry', userMediaGalleryEntrySchema)

module.exports = UserMediaGalleryEntry