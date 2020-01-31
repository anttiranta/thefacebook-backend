// Imports
const graphqlHTTP = require('express-graphql')

// App Imports
const serverConfig = require('../config/server.json')
const authentication = require('../middleware/authentication')
const schema = require('./schema')

// Setup GraphQL
module.exports = function (server) {
  console.info('SETUP - GraphQL...')

  server.use(authentication)

  // API (GraphQL on route `/`)
  server.use(serverConfig.graphql.endpoint, graphqlHTTP(request => ({
    schema,
    graphiql: serverConfig.graphql.ide,
    pretty: serverConfig.graphql.pretty,
    context: {
      auth: {
        user: request.user,
        isAuthenticated: request.user && request.user.id > 0
      }
    }
  })))
}