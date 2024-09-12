import { NotFoundError } from '../../../../../common/errors/notFoundError'
import { UpdateTopicDTO } from '../../../dtos/topic.update.dto'
import { TopicEntity } from '../../../entity/topics.entity'
import { TopicRepository } from '../../../repository/topics.repository'
import { TopicUpdateUseCase } from '../topic.update.useCase'

jest.mock('../../../repository/topics.repository', () => {
    return {
        TopicRepository: jest.fn().mockImplementation(() => ({
            findOne: jest.fn(),
            updateTopic: jest.fn(),
        })),
    }
})

describe('TopicUpdateUseCase', () => {
    let useCase: TopicUpdateUseCase
    let mockTopicRepository: jest.Mocked<TopicRepository>

    beforeEach(() => {
        mockTopicRepository = new TopicRepository() as jest.Mocked<TopicRepository>
        useCase = new TopicUpdateUseCase()
        useCase['topicRepository'] = mockTopicRepository
    })

    test('should update topic content successfully', async () => {
        const topicId = '1'
        const updateData: UpdateTopicDTO = { content: 'Updated content' }

        const existingTopic = {
            id: 1,
            content: 'Old content',
            name: 'Old Topic',
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

        const updatedTopic = {
            ...existingTopic,
            content: updateData.content,
        } as unknown as TopicEntity

        mockTopicRepository.findOne.mockResolvedValue(existingTopic)
        mockTopicRepository.updateTopic.mockResolvedValue(updatedTopic)

        const result = await useCase.updateTopic(topicId, updateData)

        expect(mockTopicRepository.findOne).toHaveBeenCalledWith({
            where: { id: Number(topicId) },
            relations: ['children'],
        })

        expect(result).toEqual(updatedTopic)
    })

    test('should throw NotFoundError when topic not found', async () => {
        const topicId = '999'
        const updateData: UpdateTopicDTO = { content: 'New content' }

        mockTopicRepository.findOne.mockResolvedValue(null)

        await expect(useCase.updateTopic(topicId, updateData)).rejects.toThrow(
            new NotFoundError(`Topic with id ${topicId} not found`),
        )

        expect(mockTopicRepository.findOne).toHaveBeenCalledWith({
            where: { id: Number(topicId) },
            relations: ['children'],
        })
    })
})
