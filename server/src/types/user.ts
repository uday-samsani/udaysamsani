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

@ObjectType()
export class ValidatorResponse {
    @Field(() => [FieldError], {nullable: true})
    errors?: FieldError[];
}