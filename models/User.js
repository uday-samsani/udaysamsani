const { model, Schema } = require('mongoose');

const UserSchema = new Schema({
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	dob: {
		type: String,
		requires: true
	},
	posts: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Post'
		}
	],
	createdAt: {
		type: String
	},
	UpdatedAt: {
		type: String
	}
});

module.exports = model('User', UserSchema);
