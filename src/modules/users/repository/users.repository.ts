import { FindManyOptions } from 'typeorm'
import { BaseRepository } from '../../../common/repository/base.repository'
import { UserEntity } from '../entity/users.entity'

export class UsersRepository extends BaseRepository<UserEntity> {
    constructor() {
        super(UserEntity)
    }

    public async getAllUsers(
        options?: FindManyOptions<UserEntity>,
    ): Promise<UserEntity[]> {
        return this.findAll(options)
    }

    public laurel() {
        const ok = this.repository
            .createQueryBuilder('users')
            .addSelect([])
            .where('users.id is not null')

        return ok.getMany()
    }
}
