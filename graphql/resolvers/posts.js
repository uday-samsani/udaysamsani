const { AuthenticationError } = require('apollo-server');
const { UserInputError } = require('apollo-server');

const Post = require('../../models/Post');
const User = require('../../models/User');
const Comment = require('../../models/Comment');
const authenticate = require('../../utils/authenticate');
const {
    validatePostInput,
    validatePostUpdateInput,
} = require('../../utils/validators');

const getComments = (commentIds) => {
    if (commentIds === []) {
        return [];
    }
    const comments = commentIds.map(async (comment) => {
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
        getPostById: async (_, { postId }) => {
            try {
                const post = await Post.findById(postId)
                    .populate('user')
                    .populate({ path: 'comments', populate: { path: 'user' } })
                    .populate({ path: 'likes', populate: { path: 'user' } });
                if (post) {
                    return post;
                } else {
                    throw new Error('BLog not found.');
                }
            } catch (error) {
                throw new Error(error);
            }
        },
        getPostByTitle: async (_, { postTitle }) => {
            try {
                const post = await Post.findOne({ title: postTitle })
                    .populate('user')
                    .populate({ path: 'comments', populate: { path: 'user' } })
                    .populate({ path: 'likes', populate: { path: 'user' } });
                if (post) {
                    return post;
                } else {
                    throw new Error('BLog not found.');
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
                return posts;
            } catch (error) {
                throw new Error(error);
            }
        },
    },
    Mutation: {
        createPost: async (
            _,
            { postInput: { title, subtitle, body, tags } },
            context
        ) => {
            try {
                const { valid, errors } = await validatePostInput(title, body);
                if (!valid) {
                    throw new UserInputError('Errors', { errors });
                }
                const user = authenticate(context);
                let post = new Post({
                    title,
                    subtitle,
                    body,
                    tags,
                    user: user.id,
                    createdAt: new Date().toISOString(),
                });
                post = await post.save();
                return Post.populate(post, [{ path: 'user' }]);
            } catch (error) {
                throw new Error(error);
            }
        },
        updatePost: async (
            _,
            { postId, postInput: { title, subtitle, body, tags } },
            context
        ) => {
            try {
                authenticate(context);
                const { valid, errors } = await validatePostUpdateInput(
                    postId,
                    title,
                    body
                );
                if (!valid) {
                    throw new UserInputError('Errors', { errors });
                }
                await Post.findByIdAndUpdate(
                    { _id: postId },
                    {
                        title,
                        subtitle,
                        body,
                        tags,
                        updatedAt: new Date().toISOString(),
                    }
                );
                const post = await Post.findById(postId);
                return Post.populate(post, [{ path: 'user' }]);
            } catch (error) {
                console.log(error);
                throw new Error(error);
            }
        },
        deletePost: async (_, { postId }, context) => {
            const user = authenticate(context);
            const post = await Post.findById(postId);
            if (!post) {
                throw new UserInputError('Error', { post: 'post not found' });
            }
            if (user.id === post.user.toString()) {
                await post.delete();
                return 'Post deleted successfully';
            } else {
                throw new AuthenticationError('No authorization');
            }
        },
    },
};

module.exports = resolvers;
