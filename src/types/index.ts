import {Field, ObjectType} from 'type-graphql';

export class Context {
	jwtToken: string;
}

export class JwtToken{
	id: string
	email: string
	exp: number
}

@ObjectType()
export class PageInfo {
	@Field(() => Boolean, {nullable: true})
	hasNextPage?: Boolean;

	@Field(() => Boolean, {nullable: true})
	hasPreviousPage?: Boolean;
}

@ObjectType()
export class FieldError {
	@Field()
	field!: string;

	@Field()
	message!: string;
}