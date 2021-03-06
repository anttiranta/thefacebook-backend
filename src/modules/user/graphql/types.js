// Imports
const GraphQLObjectType = require('graphql').GraphQLObjectType
const GraphQLString = require('graphql').GraphQLString
const GraphQLInt = require('graphql').GraphQLInt
const GraphQLList = require('graphql').GraphQLList
const UserMediaGalleryEntryType = require('../../media_gallery/graphql/types').UserMediaGalleryEntryType

// User type
const UserType = new GraphQLObjectType({
  name: 'user',
  description: 'User type',

  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    createdAt: { type: GraphQLString }, 
    updatedAt: { type: GraphQLString },
    gender: { type: GraphQLString },
    memberSince: { type: GraphQLString },
    status: { type: GraphQLString },
    year: { type: GraphQLInt },
    concentation: { type: GraphQLString },
    lookingFor: { type: GraphQLString },
    interestedIn: { type: GraphQLString },
    relationship: { type: GraphQLString },
    politicalView: { type: GraphQLString },
    interests: { type: GraphQLString },
    phone: { type: GraphQLString },
    school: { type: GraphQLString },
    friends: { type: new GraphQLList(UserType) },
    profilePicture: { type: UserMediaGalleryEntryType }
  })
})

// User Login type
const UserLoginType = new GraphQLObjectType({
  name: 'userAuth',
  description: 'User Authentication Type',

  fields: () => ({
    user: { type: UserType },
    token: { type: GraphQLString }
  })
})

module.exports = { UserType, UserLoginType }