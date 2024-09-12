import { AppDataSource } from '../../config/database/ormconfig'
import { ResourceEntity } from '../../modules/resources/entity/resource.entity'
import { ResourceType } from '../enum/resources/resources.enum'

export const seedResources = async () => {
    const resourceRepository = AppDataSource.getRepository(ResourceEntity)

    const existingResources = await resourceRepository.find()
    if (existingResources.length > 0) {
        console.log('Resources already seeded.')
        return
    }

    const resources = [
        {
            topicId: 1,
            url: 'http://example.com/resource1',
            description: 'Resource 1 for root topic',
            type: ResourceType.Article,
        },
        {
            topicId: 2,
            url: 'http://example.com/resource2',
            description: 'Resource 2 for child topic 1',
            type: ResourceType.Video,
        },
        {
            topicId: 3,
            url: 'http://example.com/resource3',
            description: 'Resource 3 for child topic 2',
            type: ResourceType.PDF,
        },
        {
            topicId: 4,
            url: 'http://example.com/resource4',
            description: 'Resource 4 for great-grandchild topic',
            type: ResourceType.Article,
        },
    ]

    await resourceRepository.save(resources)

    console.log('Resources have been seeded.')
}
