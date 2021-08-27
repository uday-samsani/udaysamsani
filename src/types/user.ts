import {Field, Float, InputType, ObjectType} from 'type-graphql';
import User from '../entities/User';
import {FieldError, PageInfo} from './index';

@InputType()
export class RegisterInputs {
    @Field()
    firstname!: string;

    @Field()
    lastname!: string;

    @Field()
    password!: string;

    @Field()
    email!: string;

    @Field({nullable: true})
    dob!: Date;
}

@InputType()
export class LoginInputs {
    @Field()
    email!: string;

    @Field()
    password!: string;
}

@ObjectType()
export class UserResponse {
    @Field(() => [FieldError], {nullable: true})
    errors?: FieldError[];

    @Field(() => User, {nullable: true})
    user?: User;
}

@ObjectType()
export class UserNodes {
    @Field(() => Float)
    cursor: number;

    @Field(() => User)
    node: User;
}

@ObjectType()
export class UsersResponse {

    @Field(() => [UserNodes], {nullable: true})
    edges?: UserNodes[];

    @Field(() => PageInfo, {nullable: true})
    pageInfo?: PageInfo;

    @Field(() => [FieldError], {nullable: true})
    errors?: FieldError[];
}

export type JwtData = {
    id: number;
    email: string;
    isEmailVerified: boolean;
}

export interface ValidatorResponse {
    errors: FieldError[];
}