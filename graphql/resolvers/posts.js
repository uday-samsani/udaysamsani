const path = require('path');
const { createWriteStream } = require('fs');
const { AuthenticationError } = require('apollo-server');
const { UserInputError } = require('apollo-server');
const { Storage } = require('@google-cloud/storage');
const moment = require('moment');

const Post = require('../../models/Post');
const User = require('../../models/User');
const Comment = require('../../models/Comment');
const authenticate = require('../../utils/authenticate');
const {
    validatePostInput,
    validatePostUpdateInput,
} = require('../../utils/validators');
const { env } = require('process');

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

const generateName = (filename) => {
    const fn = filename.split('.')[0];
    const date = moment().format('YYYYMMDD');
    const randomString = Math.random().toString(36).substring(2, 7);
    const cleanFileName = fn.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const fileName =
        `images/${date}-${randomString}-${cleanFileName}.` +
        filename.split('.')[1];
    return fileName.substring(0, 60);
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
        uploadFile: async (_, { file }, context) => {
            const user = authenticate(context);
            const { createReadStream, filename } = await file;
            const fileName = generateName(filename);
            const gcs = new Storage({
                projectId: 'uday-samsani',
                keyFilename: path.join(__dirname, '../../config/gcs-key.json'),
            });
            const bucket = gcs.bucket('uday-samsani');
            await new Promise((res, rej) => {
                createReadStream()
                    .pipe(
                        bucket.file(fileName).createWriteStream({
                            resumable: false,
                            gzip: true,
                        })
                    )
                    .on('Finish', res);
                res('success');
            });
            return fileName;
        },
    },
};

module.exports = resolvers;
