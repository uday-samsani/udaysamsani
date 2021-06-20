import {Arg, Authorized, Ctx, FieldResolver, Float, ID, Int, Mutation, Query, Resolver, Root} from 'type-graphql';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import {LoginInputs, RegisterInputs, UserNodes, UserResponse, UsersResponse} from '../types/user';
import {validateLoginInput, validateRegisterInput} from '../validations/user';
import {Context, FieldError} from '../types';
import Role from '../models/Role';

@Resolver(User)
class UserResolvers {

	@FieldResolver()
	async role(@Root() user: User) {
		return await Role.findOne(user.role);
	}

	@Authorized()
	@Query(() => UserResponse)
	async me(@Ctx() {jwtToken}: Context): Promise<UserResponse> {
		try {
			const jwtData = jwt.decode(jwtToken);
			if (!!jwtData && typeof jwtData !== 'string') {
				const user = await User.findOne({id: jwtData.id});
				return {user};
			}
			return {errors: [{field: 'jwt', message: 'invalid jwt token'}]};
		} catch (err) {
			return {errors: [{field: 'exception', message: err.message}]};
		}
	}

	@Query(() => UsersResponse)
	async getUsers(
		@Arg('first', () => Int) first: number,
		@Arg('after', () => Float, {nullable: true}) after: number,
		@Ctx() {log}: Context
	): Promise<UsersResponse> {
		try {
			let query = User.createQueryBuilder('model').orderBy('model.createdAt', 'DESC');
			if (after) {
				query.where('model.createdAt < :after', {after: new Date(after)});
			}
			if (first) {
				query.limit(first);
			}
			const nodes = await query.getMany();
			const edges: UserNodes[] = nodes.map((user: User) => {
				return {node: user, cursor: user.createdAt.getTime()};
			});

			const hasMore = await User.createQueryBuilder('model').where(
				'model.createdAt > :date',
				{date: edges[edges.length - 1].node.createdAt}
			).getCount() > 1;
			return {
				edges,
				pageInfo: {hasMore}
			};
		} catch (err) {
			log.error(err);
			return {errors: [{field: 'exception', message: err.message}]};
		}
	}

	@Query(() => UserResponse)
	async getUser(
		@Arg('id', () => ID) id: number
	): Promise<UserResponse> {
		try {
			const user = await User.findOne(id);
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
			const role = await Role.findOne({title: 'member'});
			const user = await User.create({...options, password: hashedPassword, role}).save();
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