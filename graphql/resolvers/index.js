const User = require('../../models/User');

const postResolvers = require('./posts');
const userResolvers = require('./users');
const commentResolvers = require('./comments');
const likeResolvers = require('./likes');
const uploadResolvers = require('./upload');

module.exports = {
    Post: {...postResolvers.Post},
    Query: {
        ...userResolvers.Query,
        ...postResolvers.Query,
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...postResolvers.Mutation,
        ...commentResolvers.Mutation,
        ...likeResolvers.Mutation,
        ...uploadResolvers.Mutation,
    },
};
