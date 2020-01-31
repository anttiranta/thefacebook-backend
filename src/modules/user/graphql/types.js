// Imports
const GraphQLObjectType = require('graphql').GraphQLObjectType
const GraphQLString = require('graphql').GraphQLString
const GraphQLInt = require('graphql').GraphQLInt

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
    concentration: { type: GraphQLString },
    lookingFor: { type: GraphQLString },
    interestedIn: { type: GraphQLString },
    relationship: { type: GraphQLString },
    politicalView: { type: GraphQLString },
    interests: { type: GraphQLString },
    //friends: { type: UserType }, // TODO!
    profilePicture: { type: GraphQLString }
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