// App Imports
const objectUtils = require('../../util/objectUtils')

const checkIsAllowed = ({ auth }) => {
    const errorMsg = 'Token missing or invalid.'

    if (!auth.user || auth.isAuthenticated !== true) {
        throw new Error(errorMsg)
    }
    if (typeof auth.user === 'object' && objectUtils.isEmpty(auth.user)) {
        throw new Error(errorMsg)
    }
}

module.exports = {
    checkIsAllowed
}