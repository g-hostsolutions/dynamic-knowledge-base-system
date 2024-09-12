/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable global-require */
import { Request, Response } from 'express'
import { jest } from '@jest/globals'
import { CreateTopicDTO } from '../../dtos/topic.create.dto'
import { TopicEntity } from '../../entity/topics.entity'
import { TopicCreateUseCase } from '../../useCases/create/topic.create.useCase'
import { TopicSearchUseCase } from '../../useCases/search/topic.search.useCase'
import { TopicController } from '../topics.controller'

jest.mock('express-validator', () => ({
    validationResult: jest.fn(),
    matchedData: jest.fn(),
}))

describe('TopicController', () => {
    let controller: TopicController
    let mockSearchUseCase: jest.Mocked<TopicSearchUseCase>
    let mockCreateUseCase: jest.Mocked<TopicCreateUseCase>
    let mockRequest: Partial<Request>
    let mockResponse: jest.Mocked<Response>

    beforeEach(() => {
        mockSearchUseCase = {
            getAllTopics: jest.fn(),
            getTreeById: jest.fn(),
            getTopicByVersion: jest.fn(),
            getShortestPath: jest.fn(),
        } as unknown as jest.Mocked<TopicSearchUseCase>

        mockCreateUseCase = {
            createTopic: jest.fn(),
        } as unknown as jest.Mocked<TopicCreateUseCase>

        controller = new TopicController()
        controller['topicSearchUseCase'] = mockSearchUseCase
        controller['topicCreateUseCase'] = mockCreateUseCase

        mockRequest = {}
        mockResponse = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        } as unknown as jest.Mocked<Response>
    })

    test('should get all topics successfully', async () => {
        const topics = [new TopicEntity()]
        jest.spyOn(mockSearchUseCase, 'getAllTopics').mockResolvedValue(
            topics as any,
        )

        await controller.getAllTopics(
            mockRequest as Request,
            mockResponse as Response,
        )

        expect(mockSearchUseCase.getAllTopics).toHaveBeenCalled()
        expect(mockResponse.json).toHaveBeenCalledWith(topics)
    })

    test('should handle error while getting all topics', async () => {
        const error = new Error('Error retrieving topic')
        jest.spyOn(mockSearchUseCase, 'getAllTopics').mockRejectedValue(error)

        await controller.getAllTopics(
            mockRequest as Request,
            mockResponse as Response,
        )

        expect(mockSearchUseCase.getAllTopics).toHaveBeenCalled()
        expect(mockResponse.status).toHaveBeenCalledWith(500)
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: 'Error retrieving topic',
            error,
        })
    })

    test('should get shortest path successfully', async () => {
        const path = { shortestPath: [1, 2, 3] }

        const matchedDataMock = jest.fn().mockImplementation((_: Request) => ({
            sourceId: '1',
            targetId: '2',
        }))

        jest.mocked(require('express-validator').matchedData).mockImplementation(
            matchedDataMock,
        )

        jest.spyOn(mockSearchUseCase, 'getShortestPath').mockResolvedValue(
            path as any,
        )

        mockRequest.query = { sourceId: '1', targetId: '2' }

        await controller.getShortestPath(
            mockRequest as Request,
            mockResponse as Response,
        )

        expect(mockSearchUseCase.getShortestPath).toHaveBeenCalledWith(1, 2)
        expect(mockResponse.json).toHaveBeenCalledWith(path)
    })

    test('should handle error while getting shortest path', async () => {
        const error = new Error('Error retrieving shortest path')
        jest.spyOn(mockSearchUseCase, 'getShortestPath').mockRejectedValue(error)

        const matchedDataMock = jest.fn().mockImplementation((_: Request) => ({
            sourceId: '1',
            targetId: '2',
        }))

        jest.mocked(require('express-validator').matchedData).mockImplementation(
            matchedDataMock,
        )

        mockRequest.query = { sourceId: '1', targetId: '2' }

        await controller.getShortestPath(
            mockRequest as Request,
            mockResponse as Response,
        )

        expect(mockSearchUseCase.getShortestPath).toHaveBeenCalledWith(1, 2)
        expect(mockResponse.status).toHaveBeenCalledWith(500)
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: 'Error retrieving shortest path',
            error,
        })
    })

    test('should get topic by version successfully', async () => {
        const topic = new TopicEntity()
        jest.spyOn(mockSearchUseCase, 'getTopicByVersion').mockResolvedValue(
            topic as any,
        )

        const matchedDataMock = jest.fn().mockImplementation((_: Request) => ({
            name: 'topic',
            version: '1',
        }))

        jest.mocked(require('express-validator').matchedData).mockImplementation(
            matchedDataMock,
        )

        mockRequest.query = { name: 'topic', version: '1' }

        await controller.getTopicsByVersion(
            mockRequest as Request,
            mockResponse as Response,
        )

        expect(mockSearchUseCase.getTopicByVersion).toHaveBeenCalledWith('topic', 1)
        expect(mockResponse.json).toHaveBeenCalledWith(topic)
    })

    test('should handle error while getting topic by version', async () => {
        const error = new Error('Error retrieving topic by version')
        jest.spyOn(mockSearchUseCase, 'getTopicByVersion').mockRejectedValue(error)

        const matchedDataMock = jest.fn().mockImplementation((_: Request) => ({
            name: 'topic',
            version: '1',
        }))

        jest.mocked(require('express-validator').matchedData).mockImplementation(
            matchedDataMock,
        )

        mockRequest.query = { name: 'topic', version: '1' }

        await controller.getTopicsByVersion(
            mockRequest as Request,
            mockResponse as Response,
        )

        expect(mockSearchUseCase.getTopicByVersion).toHaveBeenCalledWith('topic', 1)
        expect(mockResponse.status).toHaveBeenCalledWith(500)
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: 'Error retrieving topic by version',
            error,
        })
    })

    test('should get topic tree by id successfully', async () => {
        const topic = new TopicEntity()
        jest.spyOn(mockSearchUseCase, 'getTreeById').mockResolvedValue(topic as any)

        const matchedDataMock = jest.fn().mockImplementation((_: Request) => ({
            id: '1',
        }))

        jest.mocked(require('express-validator').matchedData).mockImplementation(
            matchedDataMock,
        )

        mockRequest.params = { id: '1' }

        await controller.getTopicTreeById(
            mockRequest as Request,
            mockResponse as Response,
        )

        expect(mockSearchUseCase.getTreeById).toHaveBeenCalledWith(1)
        expect(mockResponse.json).toHaveBeenCalledWith(topic)
    })

    test('should handle error while getting topic tree by id', async () => {
        const error = new Error('Error retrieving topic tree')
        jest.spyOn(mockSearchUseCase, 'getTreeById').mockRejectedValue(error)

        const matchedDataMock = jest.fn().mockImplementation((_: Request) => ({
            id: '1',
        }))

        jest.mocked(require('express-validator').matchedData).mockImplementation(
            matchedDataMock,
        )

        mockRequest.params = { id: '1' }

        await controller.getTopicTreeById(
            mockRequest as Request,
            mockResponse as Response,
        )

        expect(mockSearchUseCase.getTreeById).toHaveBeenCalledWith(1)
        expect(mockResponse.status).toHaveBeenCalledWith(500)
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: 'Error retrieving topic tree',
            error,
        })
    })

    test('should create topic successfully', async () => {
        const topicDTO: CreateTopicDTO = {
            name: 'New Topic',
            content: 'New Content',
        } as CreateTopicDTO

        const newTopic = new TopicEntity()
        jest.spyOn(mockCreateUseCase, 'createTopic').mockResolvedValue(
            newTopic as any,
        )

        const matchedDataMock = jest.fn().mockImplementation((_: Request) => ({
            ...topicDTO,
        }))

        jest.mocked(require('express-validator').matchedData).mockImplementation(
            matchedDataMock,
        )

        mockRequest.body = topicDTO

        await controller.createTopic(
            mockRequest as Request,
            mockResponse as Response,
        )

        expect(mockCreateUseCase.createTopic).toHaveBeenCalledWith(topicDTO)
        expect(mockResponse.status).toHaveBeenCalledWith(201)
        expect(mockResponse.json).toHaveBeenCalledWith(newTopic)
    })

    test('should handle error while creating topic', async () => {
        const error = new Error('Error creating topic')
        jest.spyOn(mockCreateUseCase, 'createTopic').mockRejectedValue(error)

        const matchedDataMock = jest.fn().mockImplementation((_: Request) => ({
            name: 'New Topic',
            content: 'New Content',
        }))

        jest.mocked(require('express-validator').matchedData).mockImplementation(
            matchedDataMock,
        )

        mockRequest.body = { name: 'New Topic', content: 'New Content' }

        await controller.createTopic(
            mockRequest as Request,
            mockResponse as Response,
        )

        expect(mockCreateUseCase.createTopic).toHaveBeenCalledWith(mockRequest.body)
        expect(mockResponse.status).toHaveBeenCalledWith(500)
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: 'Error creating topic',
            error,
        })
    })
})
