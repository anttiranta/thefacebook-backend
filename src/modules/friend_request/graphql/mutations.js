// Imports
const GraphQLString = require('graphql').GraphQLString

// App Imports
const FriendRequestType = require('./types').FriendRequestType
const create = require('./resolvers').createNew
const accept = require('./resolvers').acceptFriendRequest
const decline = require('./resolvers').declineFriendRequest

const createFriendRequest = {
    type: FriendRequestType,
    args: {
        creator: {
            name: 'creator',
            type: GraphQLString
        },
        receiver: {
            name: 'receiver',
            type: GraphQLString
        }
    },
    resolve: create
}

const acceptFriendRequest = {
    type: FriendRequestType,
    args: {
        creator: {
            name: 'creator',
            type: GraphQLString
        },
        receiver: {
            name: 'receiver',
            type: GraphQLString
        },
    },
    resolve: accept
}

const declineFriendRequest = {
    type: FriendRequestType,
    args: {
        creator: {
            name: 'creator',
            type: GraphQLString
        },
        receiver: {
            name: 'receiver',
            type: GraphQLString
        },
    },
    resolve: decline
}

module.exports = { createFriendRequest, acceptFriendRequest, declineFriendRequest }