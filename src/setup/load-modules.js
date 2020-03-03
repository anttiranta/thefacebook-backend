// Imports
const express = require('express')
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')

// App Imports
const config = require('./../config/env')
const authentication = require('./../middleware/authentication')

// Load express modules
module.exports = function (server) {
    console.info('SETUP - Loading modules...');

    // Enable CORS
    server.use(cors())

    // Request body parser
    server.use(bodyParser.json({limit: '3mb'}))
    server.use(bodyParser.urlencoded({limit: '3mb', extended: false}))

    // Request body cookie parser
    server.use(cookieParser())

    // Authentication middleware
    server.use(authentication)

    // Static files folder
    server.use(express.static(path.join(__dirname, '..', '..', 'public')))

    // HTTP logger
    if (config.NODE_ENV === 'development') {
        server.use(morgan('tiny'))
    }
}