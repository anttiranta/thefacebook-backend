// Imports
const GraphQLObjectType = require('graphql').GraphQLObjectType

// App Imports
const user = require('./../../modules/user/graphql/mutations')

// Mutation
const mutation = new GraphQLObjectType({
  name: 'mutations',
  description: 'API Mutations [Create, Update, Delete]',

  fields: {
    ...user
  }
})

module.exports =  mutation