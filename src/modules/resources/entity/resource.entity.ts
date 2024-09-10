import { Entity, Column } from 'typeorm'
import { CommonBaseEntity } from '../../../common/entity/commonBaseEntity.entity'
import { ResourceType } from '../../../common/enum/resources/resources.enum'
import { IResource } from '../interface/resource.interface'

@Entity()
export class ResourceEntity extends CommonBaseEntity implements IResource {
    @Column({ type: 'int' })
    topicId: number

    @Column({ type: 'varchar', length: 255 })
    url: string

    @Column({ type: 'text' })
    description: string

    @Column({
        type: 'text',
        enum: ResourceType,
    })
    type: ResourceType
}
