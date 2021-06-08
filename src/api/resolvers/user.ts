import {Arg, Authorized, Ctx, ID, Mutation, Query, Resolver} from 'type-graphql';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import User from '../entities/User';
import {LoginInputs, RegisterInputs, UserResponse, UsersResponse} from '../types/user';
import {validateLoginInput, validateRegisterInput} from '../validations/user';
import {Context, FieldError} from '../types';

@Resolver(User)
class UserResolvers {
	@Authorized()
	@Query(() => UserResponse)
	async me(@Ctx() {jwtToken}: Context): Promise<UserResponse> {
		try {
			const isValid = await jwt.verify(jwtToken, process.env.SECRET_KEY || '');
			if (isValid) {
				const jwtData = jwt.decode(jwtToken);
				if (!!jwtData && typeof jwtData !== 'string') {
					const user = await User.findOne({id: jwtData.id});
					return {user};
				}
			}
			return {errors: [{field: 'jwt', message: 'invalid jwt token'}]};
		} catch (err) {
			return {errors: [{field: 'exception', message: err.message}]};
		}
	}

	@Query(() => UsersResponse)
	async getUsers(): Promise<UsersResponse> {
		try {
			const users = await User.find({});
			return {users};
		} catch (err) {
			return {errors: [{field: 'exception', message: err.message}]};
		}
	}

	@Query(() => UserResponse)
	async getUser(
		@Arg('id', () => ID) id: number
	): Promise<UserResponse> {
		try {
			const user = await User.findOne({id});
			if (!user) {
				return {errors: [{field: 'id', message: 'no user with the given id'}]};
			}
			return {user};
		} catch (err) {
			return {errors: [{field: 'exception', message: err.message}]};
		}
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

		try {
			const hashedPassword: string = await argon2.hash(options.password);
			const user = await User.create({...options, password: hashedPassword}).save();
			return {user};
		} catch (err) {
			let errors: FieldError[] = [];
			if (err.code === '23505') {
				errors.push({
					field: 'email',
					message: 'email is already used with other user account'
				});
			}
			if (err.code === '22007') {
				errors.push({
					field: 'date of birth',
					message: 'date of birth is invalid'
				});
			}
			return {errors};
		}
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
				id: user.id,
				email: user.email,
				isEmailVerified: user.isEmailVerified
			}, process.env.SECRET_KEY || '', {expiresIn: '1h'});

			return {user};
		} catch (err) {
			return {
				errors: [{
					field: 'exception',
					message: err.message
				}]
			};
		}
	}
}

export default UserResolvers;