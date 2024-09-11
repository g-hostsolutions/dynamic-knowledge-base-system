import { Repository, EntityTarget, FindOptionsWhere, FindManyOptions } from 'typeorm'
import { AppDataSource } from '../../config/database/ormconfig'

export abstract class BaseRepository<T> {
    protected repository: Repository<T>

    constructor(entity: EntityTarget<T>) {
        this.repository = AppDataSource.getRepository(entity)
    }

    public async findAll(options?: FindManyOptions<T>): Promise<T[]> {
        return this.repository.find(options)
    }

    public async findOne(options?: FindManyOptions<T>): Promise<T> {
        return this.repository.findOne(options)
    }

    public async findById(id: number): Promise<T | null> {
        const criteria: FindOptionsWhere<T> = {
            id,
        } as unknown as FindOptionsWhere<T>
        return this.repository.findOneBy(criteria)
    }
}
