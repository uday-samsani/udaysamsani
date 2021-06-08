import {Field, InputType, ObjectType} from 'type-graphql';
import User from '../entities/User';
import {FieldError} from './index';

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
export class UsersResponse {
    @Field(() => [FieldError], {nullable: true})
    errors?: FieldError[];

    @Field(() => [User], {nullable: true})
    users?: User[];
}



export interface ValidatorResponse {
    errors: FieldError[];
}