// Imports
const GraphQLObjectType = require('graphql').GraphQLObjectType
const GraphQLInputObjectType = require('graphql').GraphQLInputObjectType
const GraphQLString = require('graphql').GraphQLString
const GraphQLInt = require('graphql').GraphQLInt
const GraphQLBoolean = require('graphql').GraphQLBoolean

// App Imports
const UserType = require('../../user/graphql/types').UserType

const ImageContentType = new GraphQLObjectType({
    name: 'imageContentType',
    description: 'Image Content Data Type',

    fields: () => ({
        base64EncodedData: { type: GraphQLString },
        mimeType: { type: GraphQLString },
        name: { type: GraphQLString },
    })
})

const ImageContentInputType = new GraphQLInputObjectType({
    name: 'imageContentInputType',
    description: 'Image Content Input Type',

    fields: () => ({
        base64EncodedData: { type: GraphQLString },
        mimeType: { type: GraphQLString },
        name: { type: GraphQLString },
    })
})

const UserMediaGalleryEntryType = new GraphQLObjectType({
    name: 'userMediaGalleryEntry',
    description: 'User Media Gallery Entry Type',

    fields: () => ({
        id: { type: GraphQLString },
        user: { type: UserType },
        label: { type: GraphQLString },
        position: { type: GraphQLInt },
        disabled: { type: GraphQLBoolean },
        mediaType: { type: GraphQLString },
        types: { type: GraphQLString }, // TODO: correct type!
        file: { type: GraphQLString },
        content: { type: ImageContentType }
    })
})

module.exports = { UserMediaGalleryEntryType, ImageContentType, ImageContentInputType }