import {Field, InputType, ObjectType} from 'type-graphql';
import User from '../entities/User';

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
export class FieldError {
    @Field()
    field!: string;

    @Field()
    message!: string;
}

@ObjectType()
export class UserResponse {
    @Field(() => [FieldError], {nullable: true})
    errors?: FieldError[];

    @Field(() => User, {nullable: true})
    user?: User;
}

export interface ValidatorResponse {
    errors: FieldError[];
}