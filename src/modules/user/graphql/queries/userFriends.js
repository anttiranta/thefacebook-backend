// Imports
const GraphQLList = require('graphql').GraphQLList
const GraphQLString = require('graphql').GraphQLString

// App Imports
const types = require('../types')
const resolvers = require('../resolvers/userFriends') 

// List
const userFriends = {
  type: new GraphQLList(types.UserType),
  args: {
    id: { type: GraphQLString }
  },
  resolve: resolvers.getList
}

module.exports = { userFriends }