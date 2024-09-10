import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm'
import { ICommonBaseEntity } from '../interfaces/commonBaseEntity.interface'

@Entity()
export abstract class CommonBaseEntity implements ICommonBaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn({
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date

    @UpdateDateColumn({
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date
}
