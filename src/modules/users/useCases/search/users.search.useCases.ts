import { UserEntity } from '../../entity/users.entity'
import { UsersRepository } from '../../repository/users.repository'

export class UserSearchUseCase {
    private readonly usersRepository: UsersRepository

    constructor() {
        this.usersRepository = new UsersRepository()
    }

    async getAllusers(): Promise<UserEntity[]> {
        return this.usersRepository.laurel()
    }
}
