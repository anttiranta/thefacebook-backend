// Imports
const GraphQLObjectType = require('graphql').GraphQLObjectType

// App Imports
const user = require('../../modules/user/graphql/queries/users')
const userManagement = require('./../../modules/user/graphql/queries/userManagement')

// Query
const query = new GraphQLObjectType({
  name: 'query',
  description: 'API Queries [Read]',

  fields: () => ({
    ...user,
    ...userManagement
  })
})

module.exports = query