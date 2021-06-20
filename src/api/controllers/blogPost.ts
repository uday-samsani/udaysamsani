import {Arg, Authorized, Ctx, FieldResolver, Float, ID, Int, Mutation, Query, Resolver, Root} from 'type-graphql';
import jwt from 'jsonwebtoken';
import BlogPost from '../models/BlogPost';
import {BlogPostInput, BlogPostNodes, BlogPostResponse, BlogPostsResponse} from '../types/blogPost';
import {Context} from '../types';
import User from '../models/User';


@Resolver(BlogPost)
class BlogPostResolvers {
	@FieldResolver(() => User)
	async user(@Root() blogPost: BlogPost) {
		return await User.findOne(blogPost.user);
	}

	@Query(() => BlogPostsResponse)
	async getBlogPosts(
		@Arg('first', () => Int) first: number,
		@Arg('after', () => Float, {nullable: true}) after: number,
		@Ctx() {log}: Context
	): Promise<BlogPostsResponse> {
		try {
			let query = BlogPost.createQueryBuilder('model').orderBy('model.createdAt', 'DESC');
			if (after) {
				query.where('model.createdAt < :after', {after: new Date(after)});
			}
			if (first) {
				query.limit(first);
			}
			const blogPosts = await query.getMany();
			const edges: BlogPostNodes[] = blogPosts.map((blogPost: BlogPost) => {
				return {node: blogPost, cursor: blogPost.createdAt.getTime()};
			});

			const hasMore = await BlogPost.createQueryBuilder('model').where(
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

	@Query(() => BlogPostResponse)
	async getBlogPost(
		@Arg('id', () => ID) id: number
	): Promise<BlogPostResponse> {
		try {
			const blogPost = await BlogPost.findOne({id});
			return {blogPost};
		} catch (err) {
			return {errors: [{field: 'exception', message: err.message}]};
		}
	}

	@Authorized(['EDITOR', 'ADMIN'])
	@Mutation(() => BlogPostResponse)
	async createBlogPost(
		@Arg('options', () => BlogPostInput) options: BlogPostInput,
		@Ctx() {jwtToken}: Context
	): Promise<BlogPostResponse> {
		try {
			const jwtData = await jwt.decode(jwtToken);
			if (!!jwtData && typeof jwtData !== 'string') {
				const user = await User.findOne({id: jwtData.id});
				const blogPost = await BlogPost.create({...options, user}).save();
				console.log(blogPost);
				return {blogPost};
			} else {
				return {errors: [{field: 'authorization', message: 'jwt token malformed'}]};
			}
		} catch (err) {
			return {errors: [{field: 'exception', message: err.message}]};
		}

	}
}

export default BlogPostResolvers;