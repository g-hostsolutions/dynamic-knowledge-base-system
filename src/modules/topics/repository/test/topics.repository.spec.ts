import { DeepPartial, FindManyOptions } from 'typeorm'
import { NotFoundError } from '../../../../common/errors/notFoundError'
import { AppDataSource } from '../../../../config/database/ormconfig'
import { UpdateTopicDTO } from '../../dtos/topic.update.dto'
import { TopicEntity } from '../../entity/topics.entity'
import { TopicRepository } from '../topics.repository'

jest.mock('../../../../config/database/ormconfig', () => ({
    AppDataSource: {
        getRepository: jest.fn(),
    },
}))

const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
}

describe('TopicRepository', () => {
    let topicRepository: TopicRepository

    beforeEach(() => {
        ;(AppDataSource.getRepository as jest.Mock).mockReturnValue(mockRepository)

        topicRepository = new TopicRepository()
    })

    test('should create topic successfully', async () => {
        const createData: DeepPartial<TopicEntity> = {
            content: 'New Topic Content',
            name: 'New Topic',
            version: 1,
            parentTopicId: null,
        }

        const createdTopic: TopicEntity = {
            id: 1,
            ...createData,
            children: [],
            createdAt: new Date(),
            updatedAt: new Date(),
            add: jest.fn(),
            remove: jest.fn(),
            getChildren: jest.fn(),
        } as unknown as TopicEntity

        mockRepository.create.mockReturnValue(createdTopic)
        mockRepository.save.mockResolvedValue(createdTopic)

        const result = await topicRepository.createTopic(createData)

        expect(mockRepository.create).toHaveBeenCalledWith(createData)
        expect(mockRepository.save).toHaveBeenCalledWith(createdTopic)
        expect(result).toEqual(createdTopic)
    })

    test('should get all topics successfully', async () => {
        const options: FindManyOptions<TopicEntity> = {}
        const topics: TopicEntity[] = []

        mockRepository.find.mockResolvedValue(topics)

        const result = await topicRepository.getAllTopics(options)

        expect(mockRepository.find).toHaveBeenCalledWith(options)
        expect(result).toEqual(topics)
    })

    test('should get tree by id successfully', async () => {
        const topicId = 1
        const topic: TopicEntity = {
            id: topicId,
            content: 'Topic Content',
            name: 'Topic Name',
            version: 1,
            parentTopicId: null,
            children: [],
            createdAt: new Date(),
            updatedAt: new Date(),
            add: jest.fn(),
            remove: jest.fn(),
            getChildren: jest.fn(),
        } as unknown as TopicEntity

        mockRepository.findOne.mockResolvedValue(topic)
        jest.spyOn(topicRepository as any, 'buildTree').mockResolvedValue(topic)

        const result = await topicRepository.getTreeById(topicId)

        expect(mockRepository.findOne).toHaveBeenCalledWith({
            where: { id: topicId },
            relations: ['children'],
        })
        expect(result).toEqual(topic)
    })

    test('should throw NotFoundError when getting tree by id if topic not found', async () => {
        const topicId = 999

        mockRepository.findOne.mockResolvedValue(null)

        await expect(topicRepository.getTreeById(topicId)).rejects.toThrow(
            new NotFoundError(`Topic with ID ${topicId} not found`),
        )

        expect(mockRepository.findOne).toHaveBeenCalledWith({
            where: { id: topicId },
            relations: ['children'],
        })
    })

    test('should get topic by version successfully', async () => {
        const name = 'Topic Name'
        const version = 1
        const topic: TopicEntity = {
            id: 1,
            content: 'Topic Content',
            name,
            version,
            parentTopicId: null,
            children: [],
            createdAt: new Date(),
            updatedAt: new Date(),
            add: jest.fn(),
            remove: jest.fn(),
            getChildren: jest.fn(),
        } as unknown as TopicEntity

        mockRepository.findOne.mockResolvedValue(topic)

        const result = await topicRepository.getTopicByVersion(name, version)

        expect(mockRepository.findOne).toHaveBeenCalledWith({
            where: { name, version },
        })
        expect(result).toEqual(topic)
    })

    test('should throw NotFoundError when getting topic by version if topic not found', async () => {
        const name = 'Nonexistent Topic'
        const version = 999

        mockRepository.findOne.mockResolvedValue(null)

        await expect(
            topicRepository.getTopicByVersion(name, version),
        ).rejects.toThrow(
            new NotFoundError(
                `Topic with name ${name} and version ${version} not found`,
            ),
        )

        expect(mockRepository.findOne).toHaveBeenCalledWith({
            where: { name, version },
        })
    })

    test('should update topic successfully', async () => {
        const existingTopic: TopicEntity = {
            id: 1,
            content: 'Old Content',
            name: 'Old Name',
            version: 1,
            parentTopicId: null,
            children: [],
            createdAt: new Date(),
            updatedAt: new Date(),
            add: jest.fn(),
            remove: jest.fn(),
            getChildren: jest.fn(),
        } as unknown as TopicEntity

        const updateData: UpdateTopicDTO = {
            content: 'Updated Content',
        }

        const updatedTopic: TopicEntity = {
            ...existingTopic,
            ...updateData,
            version: existingTopic.version + 1,
        } as unknown as TopicEntity

        mockRepository.findOne.mockResolvedValue(existingTopic)
        mockRepository.create.mockReturnValue(updatedTopic)
        mockRepository.save.mockResolvedValue(updatedTopic)

        const result = await topicRepository.updateTopic(existingTopic, updateData)

        expect(mockRepository.create).toHaveBeenCalledWith({
            ...existingTopic,
            ...updateData,
            version: existingTopic.version + 1,
        })
        expect(mockRepository.save).toHaveBeenCalledWith(updatedTopic)
        expect(result).toEqual(updatedTopic)
    })
})
