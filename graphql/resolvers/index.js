const postResolvers = require('./posts');
const userResolvers = require('./users');
const commentResolvers = require('./comments');
const likeResolvers = require('./likes');

module.exports = {
	Query: {
		...postResolvers.User,
		...postResolvers.Query
	},
	Mutation: {
		...userResolvers.Mutation,
		...postResolvers.Mutation,
		...commentResolvers.Mutation,
		...likeResolvers.Mutation
	}
};
