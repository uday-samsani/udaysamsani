import {Field, Float, InputType, ObjectType} from 'type-graphql';
import BlogPost from '../models/BlogPost';
import {FieldError, PageInfo} from './index';

@InputType()
export class BlogPostInput {
	@Field()
	title!: string;

	@Field()
	coverImage!: string;

	@Field()
	body!: string;
}

@ObjectType()
export class BlogPostResponse {
	@Field(() => [FieldError], {nullable: true})
	errors?: FieldError[];

	@Field(() => BlogPost, {nullable: true})
	blogPost?: BlogPost;
}

@ObjectType()
export class BlogPostsResponse {
	@Field(() => [BlogPostNodes], {nullable: true})
	edges?: BlogPostNodes[];

	@Field(() => PageInfo, {nullable: true})
	pageInfo?: PageInfo;

	@Field(() => [FieldError], {nullable: true})
	errors?: FieldError[];
}

@ObjectType()
export class BlogPostNodes {
	@Field(() => Float)
	cursor: number;

	@Field(() => BlogPost)
	node: BlogPost;
}

export interface ValidatorResponse {
	errors: FieldError[];
}