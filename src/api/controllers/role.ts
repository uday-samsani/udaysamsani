import {Arg, Ctx, Mutation, Query, Resolver} from 'type-graphql';
import Role from '../../entities/Role';
import {RoleResponse, RolesInput, RolesResponse} from '../../types/role';
import {Context} from '../../types';

@Resolver(Role)
class RolesResolvers {
	// @FieldResolver()
	// async users(@Root() role: Role){
	// 	const users = role.users.map(async usr=>{
	// 		return await User.findOne(usr)
	// 	})
	// 	return users;
	// }

	@Query(() => RoleResponse)
	async getRole(
		@Arg('title', () => String) title: string,
		@Ctx() {log}: Context
	): Promise<RoleResponse> {
		try {
			const role = await Role.findOne({title});
			return {role};
		} catch (err) {
			log.error(err);
			return {errors: [{field: 'exception', message: err.message}]};
		}
	}

	@Query(() => RolesResponse)
	async getRoles(
		@Ctx() {log}: Context
	): Promise<RolesResponse> {
		try {
			const roles = await Role.find({});
			console.log(roles);
			return {roles};
		} catch (err) {
			log.error(err);
			return {errors: [{field: 'exception', message: err.message}]};
		}
	}

	@Mutation(() => RoleResponse)
	async createRole(
		@Arg('options', () => RolesInput) options: RolesInput,
		@Ctx() {log}: Context
	): Promise<RoleResponse> {
		try {
			const role = await Role.create(options).save();
			return {role};
		} catch (err) {
			log.error(err);
			return {errors: [{field: 'exception', message: err.message}]};
		}
	}
}

export default RolesResolvers;