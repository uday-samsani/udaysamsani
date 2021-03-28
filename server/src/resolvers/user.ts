import {Arg, Mutation, Query, Resolver} from 'type-graphql';
import argon2 from 'argon2';
import User from '../entities/User';
import {RegisterInputs, UserResponse} from '../types/user';
import {validateRegisterInput} from '../utils/validators/user';


@Resolver(User)
class UserResolvers {
    @Query(() => [User])
    async getUsers(): Promise<User[]> {
        return await User.find({});
    }

    @Mutation(() => UserResponse)
    async register(@Arg('options', () => RegisterInputs) options: RegisterInputs): Promise<UserResponse> {
        const {errors} = validateRegisterInput(options);
        if (errors) {
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
        }
        return {user};


    }
}

export default UserResolvers;