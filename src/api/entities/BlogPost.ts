import {Field, ID, ObjectType} from 'type-graphql';
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm';
import User from './User';

@ObjectType({description: 'Object representing Blog Post'})
@Entity()
class BlogPost extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id!: number;

	@Field(() => String)
	@Column()
	title!: string;

	@Field(() => String)
	@Column()
	coverImage!: string;

	@Field(() => String)
	@Column()
	body!: string;

	@Field(() => User)
	@OneToMany(() => User, user => user.blogPosts)
	user!: User;

	@Field(() => String)
	@CreateDateColumn()
	createdAt!: Date;

	@Field(() => String)
	@UpdateDateColumn()
	updatedAt!: Date;
}

export default BlogPost;