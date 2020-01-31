// Imports
const mongoose = require('mongoose')
const sprintf = require('sprintf-js').sprintf

// App Imports
const config = require('./../config/env')
const databaseConfig = require('./../config/database.json')
const mongooseConfig = require('./../config/mongoose')

// Load database config
const databaseConfigEnv = databaseConfig[config.NODE_ENV]

module.exports = function () {
    console.info('SETUP - Connecting database...');

    const databaseUrl = sprintf(
        databaseConfigEnv.host, databaseConfigEnv.username, 
        databaseConfigEnv.password, databaseConfigEnv.database
    )

    // Create new database connection and test connection
    mongoose.connect(databaseUrl, mongooseConfig) 
    .then(() => {
        console.info('INFO - Database connected.');
    })
    .catch((error) => {
        console.error('ERROR - Unable to connect to the database:', error);
    })
}