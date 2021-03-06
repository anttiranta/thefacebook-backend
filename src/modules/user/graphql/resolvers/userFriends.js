// App Imports
const User = require('../../model/user')
const authChecker = require('../../../auth/authChecker')

// Get list
const getList = async function(parentValue, { id }, context) {
    authChecker.checkIsAllowed(context)

    const user = await User.findById(id).populate({
        path: 'friends',
        populate: { path: 'profilePicture' }
      });

    if (user) {
        if (user.friends && user.friends.length > 0) {
            return user.friends
        }
        return []
    } else {
        throw Error('User does not exist.')
    }
}

module.exports = {
    getList
}  