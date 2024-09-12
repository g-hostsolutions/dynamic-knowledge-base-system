import { ResourceType } from '../../../common/enum/resources/resources.enum'
import { ICommonBaseEntity } from '../../../common/interfaces/commonBaseEntity.interface'

export interface IResource extends ICommonBaseEntity {
    topicId: number
    url: string
    description: string
    type: ResourceType
}
