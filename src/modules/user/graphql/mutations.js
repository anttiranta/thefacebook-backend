// Imports
const GraphQLString = require('graphql').GraphQLString
const GraphQLInt = require('graphql').GraphQLInt

// App Imports
const UserType = require('./types').UserType
const create = require('./resolvers/users').createNew
const update = require('./resolvers/users').update
const remove = require('./resolvers/users').remove
const setProfilePicture = require('./resolvers/userManagement').setProfilePicture

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
    relationship: {
      name: 'relationship',
      type: GraphQLString
    },
  },
  resolve: create
}

// Update
const updateAccount = {
  type: UserType,
  args: {
    id: {
      name: 'id',
      type: GraphQLString
    },
    email: {
      name: 'email',
      type: GraphQLString
    },
    status: {
      name: 'status',
      type: GraphQLString
    },
    gender: {
      name: 'gender',
      type: GraphQLString
    },
    year: {
      name: 'year',
      type: GraphQLInt
    },
    concentation: {
      name: 'concentation',
      type: GraphQLString
    },
    lookingFor: {
      name: 'lookingFor',
      type: GraphQLString
    },
    interestedIn: {
      name: 'interestedIn',
      type: GraphQLString
    },
    relationship: {
      name: 'relationship',
      type: GraphQLString
    },
    politicalView: {
      name: 'politicalView',
      type: GraphQLString
    },
    interests: {
      name: 'interests',
      type: GraphQLString
    },
  },
  resolve: update
}

// Remove
const removeAccount = {
  type: UserType,
  args: {
    id: {
      name: 'id',
      type: GraphQLString
    }
  },
  resolve: remove
}

// Set profile picture
const setAccountProfilePicture = {
  type: UserType,
  args: {
    userId: {
      name: 'userId',
      type: GraphQLString
    },
    userMediaGalleryEntryId: {
      name: 'userMediaGalleryEntryId',
      type: GraphQLString
    },
  },
  resolve: setProfilePicture
}

module.exports = {
  createAccount,
  updateAccount,
  removeAccount,
  setAccountProfilePicture
}