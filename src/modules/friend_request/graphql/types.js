// Imports
const GraphQLObjectType = require('graphql').GraphQLObjectType
const GraphQLString = require('graphql').GraphQLString

// App Imports
const UserType = require('../../user/graphql/types').UserType

// FriendRequest type
const FriendRequestType = new GraphQLObjectType({
  name: 'friendRequest',
  description: 'Friend Request Type',

  fields: () => ({
    id: { type: GraphQLString },
    creator: { type: UserType },
    receiver: { type: UserType },
    status: { type: GraphQLString },
    createdAt: { type: GraphQLString }, 
    updatedAt: { type: GraphQLString },
  })
})

module.exports = { FriendRequestType }