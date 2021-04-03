import {Arg, Mutation, Query, Resolver} from 'type-graphql';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import User from '../entities/User';
import {LoginInputs, RegisterInputs, UserResponse} from '../types/user';
import {validateLoginInput, validateRegisterInput} from '../utils/validators/user';

@Resolver(User)
class UserResolvers {
    @Query(() => [User])
    async getUsers(): Promise<User[]> {
        return await User.find({});
    }

    @Mutation(() => UserResponse)
    async register(
        @Arg('options', () => RegisterInputs) options: RegisterInputs
    ): Promise<UserResponse> {
        const {errors} = validateRegisterInput(options);
        if (errors.length) {
            return {
                errors
            };
        }

        let user: User | undefined = undefined;
        try {
            const hashedPassword: string = await argon2.hash(options.password);
            user = await User.create({...options, password: hashedPassword}).save();
        } catch (err) {
            if (err.code === '23505') {
                return {
                    errors: [
                        {
                            field: 'email',
                            message: 'email is already used with other user account'
                        }
                    ]
                };
            }
            if (err.code === '22007') {
                return {
                    errors: [
                        {
                            field: 'date of birth',
                            message: 'date of birth is invalid'
                        }
                    ]
                };
            }
        }
        return {user};
    }

    @Mutation(() => UserResponse)
    async login(
        @Arg('options', () => LoginInputs) options: LoginInputs
    ): Promise<UserResponse> {
        const {errors} = validateLoginInput(options);
        if (errors.length) {
            return {
                errors
            };
        }

        try {
            const user: User | undefined = await User.findOne({where: {email: options.email}});
            if (!user) {
                return {
                    errors: [{
                        field: 'credentials',
                        message: 'invalid'
                    }]
                };
            }
            const isSamePassword = await argon2.verify(user.password, options.password);
            if (!isSamePassword) {
                return {
                    errors: [{
                        field: 'credentials',
                        message: 'invalid'
                    }]
                };
            }

            user.token = await jwt.sign({
                email: user.email,
                isEmailVerified: user.isEmailVerified
            }, process.env.SECRET_KEY || '', {expiresIn: '1h'});

            return {user};
        } catch (err) {
            return {
                errors: [{
                    field: 'credentials',
                    message: err.message
                }]
            };
        }
    }
}

export default UserResolvers;