// Imports
const GraphQLObjectType = require('graphql').GraphQLObjectType

// App Imports
const user = require('./../../modules/user/graphql/mutations')
const friendRequest = require('./../../modules/friend_request/graphql/mutations')
const mediaGallery = require('./../../modules/media_gallery/graphql/mutations')

// Mutation
const mutation = new GraphQLObjectType({
  name: 'mutations',
  description: 'API Mutations [Create, Update, Delete]',

  fields: {
    ...user,
    ...friendRequest,
    ...mediaGallery
  }
})

module.exports =  mutation