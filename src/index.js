// Imports
const express = require('express')

// App Imports
const setupLoadModules = require('./setup/load-modules')
const setupGraphQL = require('./setup/graphql')
const setupStartServer = require('./setup/start-server')
const setupStartDatabase = require('./setup/database') 

// Create express server
const server = express()

// Start database
setupStartDatabase()

// Setup load modules
setupLoadModules(server)

// Setup GraphQL
setupGraphQL(server)

// Start server
setupStartServer(server)