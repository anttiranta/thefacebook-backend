// Imports
const GraphQLString = require('graphql').GraphQLString

// App Imports
const UserMediaGalleryEntryType = require('./types').UserMediaGalleryEntryType
const ImageContentInputType = require('./types').ImageContentInputType
const create = require('./resolvers').create
const update = require('./resolvers').update
const remove = require('./resolvers').remove

// Create new gallery entry
const createUserGalleryEntry = {
    type: UserMediaGalleryEntryType,
    args: {
        userId: {
            name: 'userId',
            type: GraphQLString
        },
        label: {
            name: 'label',
            type: GraphQLString
        },
        content: {
            name: 'content',
            type: ImageContentInputType
        }
        // TODO: add types!
    },
    resolve: create
}

// Update gallery entry
const updateUserGalleryEntry = {
    type: UserMediaGalleryEntryType,
    args: {
        id: {
            name: 'id',
            type: GraphQLString
        },
        userId: {
            name: 'userId',
            type: GraphQLString
        },
        label: {
            name: 'label',
            type: GraphQLString
        },
        content: {
            name: 'content',
            type: ImageContentInputType
        }
    },
    resolve: update
}

// Remove gallery entry
const removeUserGalleryEntry = {
    type: UserMediaGalleryEntryType,
    args: {
        id: {
            name: 'id',
            type: GraphQLString
        },
        userId: {
            name: 'userId',
            type: GraphQLString
        }
    },
    resolve: remove
}

module.exports = { 
    createUserGalleryEntry, 
    updateUserGalleryEntry, 
    removeUserGalleryEntry 
}