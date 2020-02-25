// Imports
const GraphQLString = require('graphql').GraphQLString
const GraphQLBoolean = require('graphql').GraphQLBoolean
const GraphQLInt = require('graphql').GraphQLInt

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
        },
        disabled: {
            name: 'disabled',
            type: GraphQLBoolean
        }
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
        position: {
            name: 'position',
            type: GraphQLInt
        },
        disabled: {
            name: 'disabled',
            type: GraphQLBoolean
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