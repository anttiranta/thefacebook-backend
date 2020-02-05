// Imports
const GraphQLList = require('graphql').GraphQLList
const GraphQLString = require('graphql').GraphQLString

// App Imports
const types = require('../types')
const resolvers = require('../resolvers/users')

// List
const users = {
  type: new GraphQLList(types.UserType),
  args: {
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    sex: { type: GraphQLString },
    lookingFor: { type: GraphQLString },
    interestedIn: { type: GraphQLString },
    politicalViews: { type: GraphQLString },
    interests: { type: GraphQLString },
  },
  resolve: resolvers.getList
}

// By ID
const getUserById = {
  type: types.UserType,
  args: {
    id: { type: GraphQLString }
  },
  resolve: resolvers.getById
}

// By username
const getUserByUsername = {
  type: types.UserType,
  args: {
    username: { type: GraphQLString }
  },
  resolve: resolvers.getByUsername
}

module.exports = { users, getUserById, getUserByUsername }