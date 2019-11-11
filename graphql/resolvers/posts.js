const { AuthenticationError } = require('apollo-server');
const { UserInputError } = require('apollo-server');

const Post = require('../../models/Post');
const User = require('../../models/User');
const Comment = require('../../models/Comment');
const authenticate = require('../../utils/authenticate');
const { validatePostInput } = require('../../utils/validators');

const getComments = commentIds => {
	if (commentIds === []) {
		return [];
	}
	const comments = commentIds.map(async comment => {
		const tempComment = await Comment.findById(comment);
		tempComment.user = await User.findById(tempComment.user);
		return tempComment;
	});
	return comments;
};

const resolvers = {
	Query: {
		sayHi: () => {
			return 'Welcome to graphql api of udaysamsani.com';
		},
		getPost: async (_, { postId }) => {
			try {
				const post = await Post.findById(postId)
					.populate('user')
					.populate({ path: 'comments', populate: { path: 'user' } })
					.populate({ path: 'likes', populate: { path: 'user' } });
					.populate({ path: 'comments', populate: { path: 'user' } });
				if (post) {
					return post;
				} else {
					throw new Error('Post not found.');
				}
			} catch (error) {
				throw new Error(error);
			}
		},
		getPosts: async () => {
			try {
				const posts = await Post.find()
					.sort({ createdAt: -1 })
					.populate('user')
					.populate({ path: 'comments', populate: { path: 'user' } })
					.populate({ path: 'likes', populate: { path: 'user' } });
					.populate({ path: 'comments', populate: { path: 'user' } });
				return posts;
			} catch (error) {
				throw new Error(error);
			}
		}
	},
	Mutation: {
		createPost: async (
			_,
			{ postInput: { title, subtitle, body, tags } },
			context
		) => {
			try {
				const { valid, errors } = validatePostInput(
					title,
					subtitle,
					body,
					tags
				);
				if (valid) {
					const user = authenticate(context);
					let post = new Post({
						title,
						subtitle,
						body,
						tags,
						user: user.id,
						createdAt: new Date().toISOString()
					});
					post = await post.save();
					return Post.populate(post, [
						{ path: 'user' },
						{ path: 'comments', populate: { path: 'user' } },
						{ path: 'likes', populate: { path: 'user' } }
					]);
				} else {
					throw new UserInputError('Error', { errors });
				}
			} catch (error) {
				throw new Error(error);
			}
		},
		deletePost: async (_, { postId }, context) => {
			const user = authenticate(context);

			const post = await Post.findById(postId);
			if (user.id === post.user.toString()) {
				await post.delete();
				return 'Post deleted successfully';
			} else {
				throw new AuthenticationError('No authorization');
			}
		}
	}
};

module.exports = resolvers;
