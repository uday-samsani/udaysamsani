const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {UserInputError} = require('apollo-server');
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
    const role = user.role;
    return jwt.sign(
        {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            emailVerified: user.emailVerified,
            role,
        },
        process.env.SecretKey,
        {expiresIn: '1h'}
    );
};

const Resolvers = {

    Query: {
        sayHi: () => {
            return 'Welcome to graphql api of udaysamsani.com';
        },
    },
    Mutation: {
        login: async (_, {email, password}) => {
            const {valid, errors} = validateLoginInput(email, password);
            if (!valid) {
                throw new UserInputError('Errors', {errors});
            }
            const user = await User.findOne({email});
            if (!user) {
                errors.credentials = 'Wrong credentials';
                throw new UserInputError('Credentials', {errors});
            }
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                errors.credentials = 'wrong credentials';
                throw new UserInputError('credentials', {error: errors});
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
            {
                signinInput: {
                    firstname,
                    lastname,
                    email,
                    password,
                    confirmPassword,
                    dob,
                },
            }
        ) => {
            const {valid, errors} = await validateSigninInput(
                firstname,
                lastname,
                email,
                password,
                confirmPassword,
                dob
            );
            if (!valid) {
                console.log(errors);
                throw new UserInputError('Errors', {errors});
            }
            try {
                password = await bcrypt.hash(password, 12);
                const newUser = new User({
                    firstname,
                    lastname,
                    email,
                    password,
                    dob,
                    createdAt: new Date().toISOString(),
                });
                const result = await newUser.save();
                const token = generateToken(result);
                await sendVerificationMail({user: result, token});
                return {
                    ...result._doc,
                    id: result._id,
                    token,
                };
            } catch (error) {
                throw new Error(error);
            }
        },
        resetPassword: async (_, {token, password, retypePassword}) => {
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
        sendPasswordResetLink: async (_, {email}) => {
            const user = await User.findOne({
                email: email,
                emailVerified: true,
            });
            if (user) {
                const token = generateToken(user);
                sendPasswordResetMail({user, token});
            }
            return 'email sent if verified';
        },
        verify: async (_, {token}) => {
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
