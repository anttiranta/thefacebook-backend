// Imports
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: [true, 'A user with the same email username already exists in the website.']
    },
    email: {
        type: String,
        required: true,
        unique: [true, 'A user with the same email address already exists in the website.']
    },
    name: {
        type: String,
        index: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    gender: String,
    memberSince: Date,
    status: String,
    year: {
        type: Number,
        min: [new Date().getFullYear() - 150, 'Year is not valid'],
        max: [new Date().getFullYear(), 'Year is not valid']
    },
    concentation: String,
    lookingFor: String,
    interestedIn: String,
    relationship: String,
    politicalView: String,
    interests: String,
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    profilePicture: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserMediaGalleryEntry',
        required: false,
    }
}, 
{
    timestamps: true
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User