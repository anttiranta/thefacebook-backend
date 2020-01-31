// Imports
const GraphQLSchema = require('graphql').GraphQLSchema

// App Imports
const query = require('./queries')
const mutation = require('./mutations')

// Schema
const schema = new GraphQLSchema({
  query,
  mutation
})

module.exports = schema