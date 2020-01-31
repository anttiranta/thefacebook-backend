// App Imports
const strcasecmp = require('../../../util/string/strcasecmp')
const serverConfig = require('../../../config/server.json')

// Constants
const MAX_PASSWORD_LENGTH = 256

// Functions

const checkPasswordStrength = (password) => {
    const length = password.length
    if (length > MAX_PASSWORD_LENGTH) {
      throw new Error('Please enter a password with at most ' + MAX_PASSWORD_LENGTH + ' characters.')
    }
    if (length < serverConfig.minPasswordLength) {
      throw new Error(
        'The password needs at least ' + serverConfig.minPasswordLength
        + ' characters. Create a new password and try again.'
      )
    }
    if (password.trim().length !== length) {
      throw new Error('The password can\'t begin or end with a space. Verify the password and try again.')
    }
    // TODO: check required characters?
}

const checkPasswordDifferentFromEmail = (email, password) => {
    if (strcasecmp(password, email) === 0) {
        throw Error("The password can't be the same as the email address. Create a new password and try again.")
    }
}

module.exports = {
    checkPasswordStrength,
    checkPasswordDifferentFromEmail
}