import {Field, ID, ObjectType} from 'type-graphql';
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm';
import BlogPost from './BlogPost';
import Role from './Role';

@ObjectType({description: 'Object representing user'})
@Entity('users')
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
	token!: string;

	@Field(() => Boolean, {nullable: true})
	@Column({type: 'boolean', default: 'false', nullable: true})
	isEmailVerified!: boolean;

	@Field(() => Role)
	@ManyToOne(() => Role, role => role.users)
	role: Role;

	@Field(() => [BlogPost], {nullable: true})
	@OneToMany(() => BlogPost, blogPost => blogPost.user, {cascade: true})
	blogPosts: BlogPost[];

	@Field(() => String)
	@CreateDateColumn()
	createdAt!: Date;

	@Field(() => String)
	@UpdateDateColumn()
	updatedAt!: Date;
}

export default User;