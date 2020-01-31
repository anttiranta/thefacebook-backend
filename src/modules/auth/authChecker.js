const checkIsAllowed = ({ auth }) => {
    const errorMsg = 'Token missing or invalid.'

    if (!auth.user || auth.isAuthenticated !== true) {
        throw new Error(errorMsg)
    }
    if (typeof auth.user === 'object' && Object.entries(auth.user).length === 0) {
        throw new Error(errorMsg)
    }
}

module.exports = {
    checkIsAllowed
}