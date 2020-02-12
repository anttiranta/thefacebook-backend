// Imports
const GraphQLObjectType = require('graphql').GraphQLObjectType

// App Imports
const user = require('../../modules/user/graphql/queries/users')
const userManagement = require('./../../modules/user/graphql/queries/userManagement')
const userFriends = require('../../modules/user/graphql/queries/userFriends')
const friendRequest = require('./../../modules/friend_request/graphql/queries')
const mediaGallery = require('./../../modules/media_gallery/graphql/queries')

// Query
const query = new GraphQLObjectType({
  name: 'query',
  description: 'API Queries [Read]',

  fields: () => ({
    ...user,
    ...userManagement,
    ...userFriends,
    ...friendRequest,
    ...mediaGallery
  })
})

module.exports = query