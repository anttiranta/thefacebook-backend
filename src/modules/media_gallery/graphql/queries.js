// Imports
const GraphQLList = require('graphql').GraphQLList
const GraphQLString = require('graphql').GraphQLString
const GraphQLBoolean = require('graphql').GraphQLBoolean

// App Imports
const types = require('./types')
const resolvers = require('./resolvers')

// Retrieve the list of gallery entries associated with given user
const userGalleryEntries = {
  type: new GraphQLList(types.UserMediaGalleryEntryType),
  args: {
    userId: { type: GraphQLString },
    disabled: { type: GraphQLBoolean },
  },
  resolve: resolvers.getList
}

// Return information about gallery entry
const getUserGalleryEntry = {
  type: types.UserMediaGalleryEntryType,
  args: {
    id: { type: GraphQLString }
  },
  resolve: resolvers.getById
}

module.exports = {
  userGalleryEntries,
  getUserGalleryEntry
}