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
import BlogPost from './BlogPost';

@ObjectType({description: 'Object representing user'})
@Entity()
class User extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id!: number;

	@Field(() => String)
	@Column()
	firstname!: string;

	@Field(() => String)
	@Column()
	lastname!: string;

	@Column()
	password!: string;

	@Field(() => String,)
	@Column({unique: true})
	email!: string;

	@Field(() => String)
	@Column({type: 'date'})
	dob!: Date;

	@Field(() => String, {nullable: true})
	@Column({nullable: true, default: 'member'})
	role!: string;

	@Field(() => String, {nullable: true})
	token!: string;

	@Field(() => Boolean, {nullable: true})
	@Column({type: 'boolean', default: 'false', nullable: true})
	isEmailVerified!: boolean;

	@Field(() => BlogPost)
	@OneToMany(() => BlogPost, blogPost => blogPost.user)
	blogPosts: BlogPost[];

	@Field(() => String)
	@CreateDateColumn()
	createdAt!: Date;

	@Field(() => String)
	@UpdateDateColumn()
	updatedAt!: Date;
}

export default User;