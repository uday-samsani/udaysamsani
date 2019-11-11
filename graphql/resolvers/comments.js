const { AuthenticationError } = require('apollo-server');
const { UserInputError } = require('apollo-server');

const Post = require('../../models/Post');
const Comment = require('../../models/Comment');
const authenticate = require('../../utils/authenticate');
const { validateCommentInput } = require('../../utils/validators');

const Resolvers = {
	Mutation: {
		createComment: async (_, { postId, body }, context) => {
			const user = authenticate(context);
			const { valid, errors } = validateCommentInput(body);
			if (!valid) {
				throw UserInputError('Error', { errors });
			}
			try {
				const post = await Post.findById(postId);
				if (post) {
					const newComment = new Comment({
						body: body,
						user: user.id,
						createdAt: new Date().toISOString()
					});
					const comment = await newComment.save();
					post.comments.unshift(comment.id);
					await post.save();
					return post;
				}
			} catch (error) {
				throw new Error(error);
			}
		},
		updateComment: async (_, { commentID, body }, context) => {
			const user = authenticate(context);
			try {
				const post = await Post.find().filter(comments =>
					comments.filter(
						comment => comment.id.toString() === commentID
					)
				);
				const index = post.comments.findIndex(
					comment => comment.id.toString() === commentID
				);
				if (post.comments[index].user.toString === user.id.toString()) {
					post.comments[index].body = body;
					post.comments[index].updatedAt = new Date().toISOString();
					await post.save();
					return post;
				} else throw new AuthenticationError('No authorization');
			} catch (error) {
				throw new Error(error);
			}
		},
		deleteComment: async (_, { commentID }, context) => {
			const user = authenticate(context);
			try {
				const post = await Post.find().filter(comments =>
					comments.filter(
						comment => comment.id.toString() === commentID
					)
				);
				const index = post.comments.findIndex(
					comment => comment.id.toString() === commentID
				);
				if (post.comments[index].user.toString === user.id.toString()) {
					post.comments.splice(index, 1);
					await post.save();
					return post;
				} else throw new AuthenticationError('No authorization');
			} catch (error) {
				throw new Error(error);
			}
		}
	}
};

module.exports = Resolvers;
