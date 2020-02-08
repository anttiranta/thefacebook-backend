// Imports
const GraphQLList = require('graphql').GraphQLList
const GraphQLString = require('graphql').GraphQLString

// App Imports
const types = require('./types')
const resolvers = require('./resolvers')

const getPendingFriendRequests = {
  type: new GraphQLList(types.FriendRequestType),
  args: {
    creator: { type: GraphQLString },
    receiver: { type: GraphQLString }
  },
  resolve: resolvers.getPendingFriendRequests
}

module.exports = { getPendingFriendRequests }