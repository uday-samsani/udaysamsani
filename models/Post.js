const { model, Schema } = require('mongoose');

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    subtitle: {
        type: String,
    },
    body: {
        type: String,
        required: true,
    },
    tags: [{ type: String }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment',
        },
    ],
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Like',
        },
    ],
    createdAt: {
        type: String,
    },
    updatedAt: {
        type: String,
    },
});

module.exports = model('Post', PostSchema);
