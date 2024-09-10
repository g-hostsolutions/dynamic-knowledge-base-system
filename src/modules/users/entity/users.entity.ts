import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { CommonBaseEntity } from '../../../common/entity/commonBaseEntity.entity'
import { UserRole } from '../../../common/enum/roles/user.role.enum'
import { IUserEntity } from '../interface/users.interface'

@Entity()
export class UserEntity extends CommonBaseEntity implements IUserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 255 })
    name: string

    @Column({ type: 'varchar', length: 255, unique: true })
    email: string

    @Column({
        type: 'text',
        enum: UserRole,
        default: UserRole.Viewer,
    })
    role: UserRole

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date
}
