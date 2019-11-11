const { model, Schema } = require('mongoose');

const PostSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	subtitle: {
		type: String
	},
	body: {
		type: String,
		required: true
	},
	tags: [{ type: String }],
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	comments: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Comment'
		}
	],
	likes: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: 'User'
			},
			createdAt: String
		}
	],
	createdAt: {
		type: String
	},
	updatedAt: {
		type: String
	}
});

module.exports = model('Post', PostSchema);
