import { AppDataSource } from '../../config/database/ormconfig'
import { UserEntity } from '../../modules/users/entity/users.entity'
import { UserRole } from '../enum/roles/user.role.enum'

export const seedUsers = async () => {
    const userRepository = AppDataSource.getRepository(UserEntity)

    const existingUsers = await userRepository.find()
    if (existingUsers.length > 0) {
        console.log('Users already seeded.')
        return
    }

    const users = [
        { name: 'Admin User', email: 'admin@example.com', role: UserRole.Admin },
        { name: 'Editor User', email: 'editor@example.com', role: UserRole.Editor },
        {
            name: 'Viewer User 1',
            email: 'viewer1@example.com',
            role: UserRole.Viewer,
        },
        {
            name: 'Viewer User 2',
            email: 'viewer2@example.com',
            role: UserRole.Viewer,
        },
    ]

    await userRepository.save(users)
    return console.log('Users have been seeded.')
}
