// Imports
const GraphQLString = require('graphql').GraphQLString

// App Imports
const types = require('../types')
const resolvers = require('../resolvers/userManagement')

// Auth
const authenticate = {
  type: types.UserLoginType,
  args: {
    username: {
      name: 'username',
      type: GraphQLString
    },
    password: {
      name: 'password',
      type: GraphQLString
    },
  },
  resolve: resolvers.authenticate
}

module.exports = { authenticate }