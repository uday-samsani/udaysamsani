const { model, Schema } = require('mongoose');

const CommentSchema = new Schema({
	post: {
		type: Schema.Types.ObjectId,
		ref: 'Post'
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	createdAt: {
		type: String
	}
});

module.exports = model('Like', CommentSchema);
