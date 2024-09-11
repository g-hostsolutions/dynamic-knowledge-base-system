import { ICommonBaseEntity } from '../../../common/interfaces/commonBaseEntity.interface'

export interface ITopic extends ICommonBaseEntity {
    name: string
    content: string
    version?: number
    parentTopicId?: number
    children: ITopic[]
    parent: ITopic | null
    add(child: ITopic): void
    remove(child: ITopic): void
    getChildren(): ITopic[]
}
