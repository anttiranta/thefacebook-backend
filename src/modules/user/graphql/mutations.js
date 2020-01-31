// Imports
const GraphQLString = require('graphql').GraphQLString

// App Imports
const UserType = require('./types').UserType
const create = require('./resolvers/users').createNew
const remove = require('./resolvers/users').remove

// Create
const createAccount = {
  type: UserType,
  args: {
    name: {
      name: 'name',
      type: GraphQLString
    },
    email: {
      name: 'email',
      type: GraphQLString
    },
    password: {
      name: 'password',
      type: GraphQLString
    },
    username: {
      name: 'username',
      type: GraphQLString
    },
  },
  resolve: create
}

// Remove
const userRemove = {
  type: UserType,
  args: {
    id: {
      name: 'id',
      type: GraphQLString
    }
  },
  resolve: remove
}

module.exports = { createAccount, userRemove }