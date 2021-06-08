import {Field, ObjectType, registerEnumType} from 'type-graphql';
import {FastifyLoggerInstance, FastifyRequest} from 'fastify';

export class Context {
	jwtToken: string;
	request: FastifyRequest;
	log: FastifyLoggerInstance;
}


export enum Sort {
	ASC = 'ASC',
	DESC = 'DESC'
}

registerEnumType(Sort, {
	name: 'Sort',
	description: 'Different sorting i.e. sort ascending or descending'
});

export class JwtToken {
	id: string;
	email: string;
	exp: number;
}

@ObjectType()
export class PageInfo {
	@Field(() => Boolean, {nullable: true})
	hasMore?: Boolean;
}

@ObjectType()
export class FieldError {
	@Field()
	field!: string;

	@Field()
	message!: string;
}