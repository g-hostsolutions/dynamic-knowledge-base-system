import { DataSource } from 'typeorm'
import { UserEntity } from '../../modules/users/entity/users.entity'
import { TopicEntity } from '../../modules/topics/entity/topics.entity'
import { ResourceEntity } from '../../modules/resources/entity/resource.entity'

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: ':memory:',
    synchronize: true,
    logging: process.env.CURRENT_ENVIROMENT === 'development',
    entities: [UserEntity, TopicEntity, ResourceEntity],
    subscribers: [],
    migrations: [],
})
