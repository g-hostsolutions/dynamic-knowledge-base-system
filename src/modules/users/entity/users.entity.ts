import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { Field, ID, ObjectType } from 'type-graphql'
import { CommonBaseEntity } from '../../../common/entity/commonBaseEntity.entity'
import { UserRole } from '../../../common/enum/roles/user.role.enum'
import { IUserEntity } from '../interface/users.interface'

@ObjectType()
@Entity()
export class UserEntity extends CommonBaseEntity implements IUserEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column({ type: 'varchar', length: 255 })
    name: string

    @Field()
    @Column({ type: 'varchar', length: 255, unique: true })
    email: string

    @Column({
        type: 'text',
        enum: UserRole,
        default: UserRole.Viewer,
    })
    role: UserRole
}
