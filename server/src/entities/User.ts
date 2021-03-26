import {ObjectType, Field, ID} from 'type-graphql';
import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

@ObjectType({ description: "Object representing user" })
@Entity()
class User extends BaseEntity{
    @Field(()=>ID)
    @PrimaryGeneratedColumn()
    id!:number

    @Field(()=>String)
    @Column(()=>String)
    firstname!: string

    @Field(()=>String)
    @Column(()=>String)
    lastname!: string

    @Column(()=>String)
    password!: string

    @Field(()=>String)
    @Column(()=>String)
    email!: string

    @Field(()=>Date,{nullable:true})
    @Column(()=>Date)
    dob!: Date

    @Field(()=>String)
    @Column(()=>String)
    role!: string

    @Field(()=>Boolean)
    @Column(()=>Boolean)
    emailVerified!: boolean

    @Field(()=>Date)
    @CreateDateColumn()
    createdAt!: Date

    @Field(()=>Date)
    @UpdateDateColumn()
    UpdatedAt!: Date
}
export default User;