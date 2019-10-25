const { AuthenticationError } = require('apollo-server');
const { UserInputError } = require('apollo-server');

const Post = require('../../models/Post');
const authenticate = require('../../utils/authenticate');
const { validatePostInput } = require('../../utils/validators');

const resolvers = {
	Query: {
		sayHi: () => {
			return 'Hello from server';
		},
		getPost: async (_, { postId }) => {
			try {
				const post = await Post.findById(postId);
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
				const posts = await Post.find().sort({ createdAt: -1 });
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
					const post = new Post({
						title,
						subtitle,
						body,
						tags,
						user: user.id,
						username: user.username,
						createdAt: new Date().toISOString()
					});
					const result = await post.save();
					return result;
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
			if (user.username === post.username) {
				await post.delete();
				return 'Post deleted successfully';
			} else {
				throw new AuthenticationError('No authorization');
			}
		}
	}
};

module.exports = resolvers;
