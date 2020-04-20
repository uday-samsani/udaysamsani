const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const User = require('../../models/User');
const {
	validateSigninInput,
	validateLoginInput
} = require('../../utils/validators');

const generateToken = user => {
	return jwt.sign(
		{
			id: user.id,
			username: user.username,
			email: user.email
		},
		process.env.SecretKey,
		{ expiresIn: '1h' }
	);
};

const Resolvers = {
	Mutation: {
		login: async (_, { username, password }) => {
			const { valid, errors } = validateLoginInput(username, password);
			if (!valid) {
				throw new UserInputError('Errors', { errors });
			}
			const user = await User.findOne({ username });
			if (!user) {
				errors.credentials = 'Wrong credentials';
				throw new UserInputError('Credentials', { errors });
			}
			const match = await bcrypt.compare(password, user.password);
			if (!match) {
				errors.credentials = 'wrong credentials';
				// throw new UserInputError('credentials', { errors });
				throw new UserInputError('credentials', { error: errors });
			}
			const token = generateToken(user);

			return {
				...user._doc,
				id: user._id,
				token
			};
		},
		signin: async (
			_,
			{ signinInput: { username, email, password, confirmPassword, dob } }
		) => {
			const { valid, errors } = await validateSigninInput(
				username,
				email,
				password,
				confirmPassword,
				dob
			);
			if (!valid) {
				throw new UserInputError('Errors', { errors });
			}
			try {
				password = await bcrypt.hash(password, 12);
				const newUser = new User({
					username,
					email,
					password,
					dob,
					createdAt: new Date().toISOString()
				});
				const result = await newUser.save();
				const token = generateToken(result);
				return {
					...result._doc,
					id: result._id,
					token
				};
			} catch (error) {
				throw new Error(error);
			}
		}
	}
};

module.exports = Resolvers;
