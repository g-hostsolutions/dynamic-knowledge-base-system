import { DataSource } from 'typeorm'
import { UserEntity } from '../../modules/users/entity/users.entity'

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'root',
    password: 'root',
    database: 'new_app',
    synchronize: true,
    logging: false,
    entities: [UserEntity],
})
