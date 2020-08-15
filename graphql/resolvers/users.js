const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { UserInputError } = require('apollo-server');
const {
    sendVerificationMail,
    sendPasswordResetMail,
} = require('../../utils/email');
const User = require('../../models/User');
const {
    validateSigninInput,
    validateLoginInput,
} = require('../../utils/validators');

const generateToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            username: user.username,
            email: user.email,
            emailVerified: user.emailVerified,
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
                throw new UserInputError('credentials', { error: errors });
            }
            const token = generateToken(user);

            return {
                ...user._doc,
                id: user._id,
                token,
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
                    createdAt: new Date().toISOString(),
                });
                const result = await newUser.save();
                const token = generateToken(result);
                sendVerificationMail({ user: result, token });
                return {
                    ...result._doc,
                    id: result._id,
                    token,
                };
            } catch (error) {
                throw new Error(error);
            }
        },
        resetPassword: async (_, { token, password, retypePassword }) => {
            if (password !== retypePassword) {
                throw new UserInputError('Errors', {
                    password: 'passwords do not match',
                });
            } else {
                try {
                    const user = await jwt.verify(token, process.env.SecretKey);
                    const result = await User.findById(user.id);
                    if (result) {
                        password = await bcrypt.hash(password, 12);
                        await User.findByIdAndUpdate(user.id, {
                            password: password,
                        });
                        return 'password updated succesfully';
                    } else {
                        throw new UserInputError('Errors', {
                            token: 'invalid/expired token',
                        });
                    }
                } catch (error) {
                    throw new UserInputError('Errors', {
                        token: 'invalid/expired token',
                    });
                }
            }
        },
        sendPasswordResetLink: async (_, { email }) => {
            const user = await User.findOne({
                email: email,
                emailVerified: true,
            });
            if (user) {
                const token = generateToken(user);
                sendPasswordResetMail({ user, token });
            }
            return 'email sent';
        },
        verify: async (_, { token }) => {
            try {
                const user = await jwt.verify(token, process.env.SecretKey);
                const result = await User.findById(user.id);
                if (!result.emailVerified) {
                    await User.findByIdAndUpdate(user.id, {
                        emailVerified: true,
                    });
                }
                return 'email confirmed';
            } catch (error) {
                throw new UserInputError('Errors', {
                    token: 'invalid/expired token',
                });
            }
        },
    },
};

module.exports = Resolvers;
