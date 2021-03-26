import {Resolver,Query} from 'type-graphql';
import User from '../entities/User';

@Resolver(User)
class UserResolvers{
    @Query(()=>[User])
    async getUsers():Promise<User[]>{
        return await User.find({})
    }
}

export default UserResolvers