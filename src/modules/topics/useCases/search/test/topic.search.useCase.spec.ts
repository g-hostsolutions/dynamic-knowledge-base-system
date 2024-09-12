import { NotFoundError } from '../../../../../common/errors/notFoundError'
import { TopicEntity } from '../../../entity/topics.entity'
import { TopicRepository } from '../../../repository/topics.repository'
import { TopicSearchUseCase } from '../topic.search.useCase'

jest.mock('../../../repository/topics.repository', () => {
    return {
        TopicRepository: jest.fn().mockImplementation(() => ({
            findAll: jest.fn(),
            getTreeById: jest.fn(),
            getTopicByVersion: jest.fn(),
            findOne: jest.fn(),
        })),
    }
})

describe('TopicSearchUseCase', () => {
    let useCase: TopicSearchUseCase
    let mockTopicRepository: jest.Mocked<TopicRepository>
    const topics: TopicEntity[] = [
        {
            id: 1,
            content: 'Topic 1',
            name: 'Topic One',
            version: 1,
            parentTopicId: null,
            parent: null,
            children: [],
            createdAt: new Date(),
            updatedAt: new Date(),
            add: jest.fn(),
            remove: jest.fn(),
            getChildren: jest.fn(),
        },
    ] as unknown as TopicEntity[]

    beforeEach(() => {
        mockTopicRepository = new TopicRepository() as jest.Mocked<TopicRepository>
        useCase = new TopicSearchUseCase()
        useCase['topicRepository'] = mockTopicRepository
    })

    test('should get all topics successfully', async () => {
        mockTopicRepository.findAll.mockResolvedValue(topics)

        const result = await useCase.getAllTopics()

        expect(mockTopicRepository.findAll).toHaveBeenCalled()
        expect(result).toEqual(topics)
    })

    test('should get topic tree by id successfully', async () => {
        const topicId = 1

        mockTopicRepository.getTreeById.mockResolvedValue(topics[0])

        const result = await useCase.getTreeById(topicId)

        expect(mockTopicRepository.getTreeById).toHaveBeenCalledWith(topicId)
        expect(result).toEqual(topics[0])
    })

    test('should get topic by version successfully', async () => {
        const name = 'Topic'
        const version = 1

        mockTopicRepository.getTopicByVersion.mockResolvedValue(topics[0])

        const result = await useCase.getTopicByVersion(name, version)

        expect(mockTopicRepository.getTopicByVersion).toHaveBeenCalledWith(
            name,
            version,
        )
        expect(result).toEqual(topics[0])
    })

    test('should get shortest path between topics successfully', async () => {
        const sourceId = 1
        const targetId = 3
        const sourceTopic: TopicEntity = {
            id: sourceId,
            content: 'Source Topic',
            name: 'Source',
            version: 1,
            parentTopicId: null,
            parent: null,
            children: [
                {
                    id: 2,
                    content: 'Intermediate Topic',
                    name: 'Intermediate',
                    version: 1,
                    parentTopicId: sourceId,
                    parent: null,
                    children: [
                        {
                            id: targetId,
                            content: 'Target Topic',
                            name: 'Target',
                            version: 1,
                            parentTopicId: 2,
                            parent: null,
                            children: [],
                            createdAt: new Date(),
                            updatedAt: new Date(),
                            add: jest.fn(),
                            remove: jest.fn(),
                            getChildren: jest.fn(),
                        } as unknown as TopicEntity,
                    ],
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    add: jest.fn(),
                    remove: jest.fn(),
                    getChildren: jest.fn(),
                } as unknown as TopicEntity,
            ],
            createdAt: new Date(),
            updatedAt: new Date(),
            add: jest.fn(),
            remove: jest.fn(),
            getChildren: jest.fn(),
        } as unknown as TopicEntity

        const targetTopic: TopicEntity = {
            id: targetId,
            content: 'Target Topic',
            name: 'Target',
            version: 1,
            parentTopicId: 2,
            parent: null,
            children: [],
            createdAt: new Date(),
            updatedAt: new Date(),
            add: jest.fn(),
            remove: jest.fn(),
            getChildren: jest.fn(),
        } as unknown as TopicEntity

        mockTopicRepository.getTreeById.mockResolvedValue(sourceTopic)
        mockTopicRepository.findOne.mockResolvedValue(targetTopic)

        const result = await useCase.getShortestPath(sourceId, targetId)

        expect(mockTopicRepository.getTreeById).toHaveBeenCalledWith(sourceId)
        expect(mockTopicRepository.findOne).toHaveBeenCalledWith({
            where: { id: targetId },
        })
        expect(result).toEqual({ shortestPath: [sourceId, 2, targetId] })
    })

    test('should throw NotFoundError when source topic is not found in shortest path', async () => {
        const sourceId = 1
        const targetId = 3

        mockTopicRepository.getTreeById.mockResolvedValue(null)

        await expect(useCase.getShortestPath(sourceId, targetId)).rejects.toThrow(
            new NotFoundError('Source topics do not exist'),
        )

        expect(mockTopicRepository.getTreeById).toHaveBeenCalledWith(sourceId)
    })

    test('should throw NotFoundError when target topic is not found in shortest path', async () => {
        const sourceId = 1
        const targetId = 3

        mockTopicRepository.getTreeById.mockResolvedValue(topics[0])
        mockTopicRepository.findOne.mockResolvedValue(null)

        await expect(useCase.getShortestPath(sourceId, targetId)).rejects.toThrow(
            new NotFoundError('Target topics do not exist'),
        )

        expect(mockTopicRepository.getTreeById).toHaveBeenCalledWith(sourceId)
        expect(mockTopicRepository.findOne).toHaveBeenCalledWith({
            where: { id: targetId },
        })
    })

    test('should throw NotFoundError when no path is found in shortest path', async () => {
        const sourceId = 1
        const targetId = 3
        const sourceTopic: TopicEntity = {
            id: sourceId,
            content: 'Source Topic',
            name: 'Source',
            version: 1,
            parentTopicId: null,
            parent: null,
            children: [],
            createdAt: new Date(),
            updatedAt: new Date(),
            add: jest.fn(),
            remove: jest.fn(),
            getChildren: jest.fn(),
        } as unknown as TopicEntity

        const targetTopic: TopicEntity = {
            id: targetId,
            content: 'Target Topic',
            name: 'Target',
            version: 1,
            parentTopicId: null,
            parent: null,
            children: [],
            createdAt: new Date(),
            updatedAt: new Date(),
            add: jest.fn(),
            remove: jest.fn(),
            getChildren: jest.fn(),
        } as unknown as TopicEntity

        mockTopicRepository.getTreeById.mockResolvedValue(sourceTopic)
        mockTopicRepository.findOne.mockResolvedValue(targetTopic)

        await expect(useCase.getShortestPath(sourceId, targetId)).rejects.toThrow(
            new NotFoundError('No path found between the topics'),
        )

        expect(mockTopicRepository.getTreeById).toHaveBeenCalledWith(sourceId)
        expect(mockTopicRepository.findOne).toHaveBeenCalledWith({
            where: { id: targetId },
        })
    })
})
