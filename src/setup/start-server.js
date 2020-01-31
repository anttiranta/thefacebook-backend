// Imports
const http = require('http')

// App Imports
const config = require('./../config/env')

// Start server
module.exports = function (server) {
  console.info('SETUP - Starting server..');

  (http.createServer(server)).listen(config.PORT, (error) => {
    if (error) {
      console.error('ERROR - Unable to start server.')
    } else {
      console.info(`INFO - Server started on http://localhost:${config.PORT} [${config.NODE_ENV}]`)
    }
  })
}