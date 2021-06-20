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
class Role extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id!: number;

	@Field(() => String)
	@Column({unique: true})
	title!: string;

	@Field(() => String)
	@Column()
	description!: string;

	@Field(() => [User], {nullable:	true})
	@OneToMany(() => User, user => user.role, {cascade: true})
	users: User[];

	@Field(() => String)
	@CreateDateColumn()
	createdAt!: Date;

	@Field(() => String)
	@UpdateDateColumn()
	updatedAt!: Date;
}

export default Role;