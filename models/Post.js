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
		ref: 'users'
	},
	username: {
		type: String,
		required: true
	},
	comments: [
		{
			body: {
				type: String,
				required: true
			},
			username: {
				type: String,
				required: true
			},
			user: {
				type: Schema.Types.ObjectId,
				required: true
			},
			createdAt: {
				type: String,
				required: true
			}
		}
	],
	likes: [
		{
			user: {
				type: Schema.Types.ObjectId,
				required: true
			},
			createdAt: {
				type: String,
				required: true
			}
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
