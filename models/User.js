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
	createdAt: {
		type: String
	},
	UpdatedAt: {
		type: String
	}
});

module.exports = model('User', UserSchema);
