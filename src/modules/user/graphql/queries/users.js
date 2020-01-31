// Imports
const GraphQLList = require('graphql').GraphQLList
const GraphQLString = require('graphql').GraphQLString

// App Imports
const types = require('../types')
const resolvers = require('../resolvers/users')

// All
const users = {
  type: new GraphQLList(types.UserType),
  resolve: resolvers.getAll
}

// By ID
const user = {
  type: types.UserType,
  args: {
    id: { type: GraphQLString }
  },
  resolve: resolvers.getById
}

module.exports = { users, user }