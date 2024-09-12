import { CreateTopicDTO } from '../../../dtos/topic.create.dto'
import { TopicEntity } from '../../../entity/topics.entity'
import { TopicRepository } from '../../../repository/topics.repository'
import { TopicCreateUseCase } from '../topic.create.useCase'

jest.mock('../../../repository/topics.repository', () => {
    return {
        TopicRepository: jest.fn().mockImplementation(() => ({
            createTopic: jest.fn(),
        })),
    }
})

describe('TopicCreateUseCase', () => {
    let useCase: TopicCreateUseCase
    let mockTopicRepository: jest.Mocked<TopicRepository>

    beforeEach(() => {
        mockTopicRepository = new TopicRepository() as jest.Mocked<TopicRepository>
        useCase = new TopicCreateUseCase()
        useCase['topicRepository'] = mockTopicRepository
    })

    test('should create topic successfully', async () => {
        const createData: CreateTopicDTO = {
            content: 'New Topic Content',
            name: 'New Topic',
            version: 1,
            parentTopicId: null,
        } as CreateTopicDTO

        const createdTopic: TopicEntity = {
            id: 1,
            content: createData.content,
            name: createData.name,
            version: createData.version,
            parentTopicId: createData.parentTopicId,
            parent: null,
            children: [],
            createdAt: new Date(),
            updatedAt: new Date(),
            add: jest.fn(),
            remove: jest.fn(),
            getChildren: jest.fn(),
        } as unknown as TopicEntity

        mockTopicRepository.createTopic.mockResolvedValue(createdTopic)

        const result = await useCase.createTopic(createData)

        expect(mockTopicRepository.createTopic).toHaveBeenCalledWith(createData)
        expect(result).toEqual(createdTopic)
    })
})
