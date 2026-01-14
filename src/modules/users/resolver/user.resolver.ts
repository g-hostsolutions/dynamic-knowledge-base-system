import { Resolver, Query } from 'type-graphql'
import { UserEntity } from '../entity/users.entity'
import { UserSearchUseCase } from '../useCases/search/users.search.useCases'

@Resolver(() => UserEntity)
export class UserResolver {
    private readonly search = new UserSearchUseCase()

    @Query(() => [UserEntity])
    users() {
        return this.search.getAllusers()
    }
}
