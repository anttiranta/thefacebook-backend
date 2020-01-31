// Load .env
require('dotenv').config()

// Environment
let NODE_ENV = process.env.NODE_ENV

// Port
let PORT = process.env.PORT

module.exports = {
  NODE_ENV,
  PORT
}