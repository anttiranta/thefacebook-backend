// Imports
const GraphQLObjectType = require('graphql').GraphQLObjectType
const GraphQLInputObjectType = require('graphql').GraphQLInputObjectType
const GraphQLString = require('graphql').GraphQLString
const GraphQLInt = require('graphql').GraphQLInt
const GraphQLBoolean = require('graphql').GraphQLBoolean

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

// Solves circular dependency issue
const getUserField = () => (
    { type: require('../../user/graphql/types').UserType }
)

const UserMediaGalleryEntryType = new GraphQLObjectType({
    name: 'userMediaGalleryEntry',
    description: 'User Media Gallery Entry Type',

    fields: () => ({
        id: { type: GraphQLString },
        user: getUserField(),
        label: { type: GraphQLString },
        position: { type: GraphQLInt },
        disabled: { type: GraphQLBoolean },
        mediaType: { type: GraphQLString },
        file: { type: GraphQLString },
        content: { type: ImageContentType },
        createdAt: { type: GraphQLString }, 
        updatedAt: { type: GraphQLString }
    })
})

module.exports = { UserMediaGalleryEntryType, ImageContentType, ImageContentInputType }