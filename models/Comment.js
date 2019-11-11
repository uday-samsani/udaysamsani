const { model, Schema } = require('mongoose');

const CommentSchema = new Schema({
	body: {
		type: String,
		required: true
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	createdAt: {
		type: String
	},
	updatedAt: {
		type: String
	}
});

module.exports = model('Comment', CommentSchema);
