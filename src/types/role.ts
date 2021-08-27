import {Field, InputType, ObjectType} from 'type-graphql';
import Role from '../entities/Role';
import {FieldError} from './index';

@InputType()
export class RolesInput {
	@Field()
	title: string;

	@Field({nullable:true})
	description: string;
}

@ObjectType()
export class RoleResponse {
	@Field(()=> Role, {nullable:true})
	role?: Role

	@Field(()=> [FieldError], {nullable:true})
	errors?: [FieldError]
}

@ObjectType()
export class RolesResponse {
	@Field(()=> [Role], {nullable:true})
	roles?: Role[]

	@Field(()=> [FieldError], {nullable:true})
	errors?: [FieldError]
}