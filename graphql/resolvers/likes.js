const Post = require('../../models/Post');
const Like = require('../../models/Like');
const authenticate = require('../../utils/authenticate');

const resolvers = {
	Mutation: {
		likePost: async (_, { postId }, context) => {
			const user = authenticate(context);
			let post = await Post.findById(postId);
			if (!post) {
				throw new Error('Post not found');
			}
			const like = await Like.findOne({ post: postId, user: user.id });
			if (!like) {
				let newLike = new Like({
					post: postId,
					user: user.id,
					createdAt: new Date().toISOString()
				});
				newLike = await newLike.save();
				post.likes.push(newLike.id);
				post = await post.save();
				return Post.populate(post, [
					{ path: 'user' },
					{ path: 'comments', populate: { path: 'user' } },
					{ path: 'likes', populate: { path: 'user' } }
				]);
			} else {
				post.likes.splice(like.id, 1);
				await Like.findByIdAndDelete(like.id);
				post = await post.save();
				return Post.populate(post, [
					{ path: 'user' },
					{ path: 'comments', populate: { path: 'user' } },
					{ path: 'likes', populate: { path: 'user' } }
				]);
			}
		}
	}
};

module.exports = resolvers;
