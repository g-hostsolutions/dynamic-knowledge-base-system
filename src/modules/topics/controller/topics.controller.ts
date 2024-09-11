import { Request, Response } from 'express'
import { TopicSearchUseCase } from '../useCases/search/topic.search.useCase'
import { RequestTransformer } from '../../../common/validator/baseRequest.validator'
import { TopicCreateUseCase } from '../useCases/create/topic.creste.useCase'
import { CreateTopicDTO } from '../dtos/topic.create.dto'
import { UpdateTopicDTO } from '../dtos/topic.update.dto'
import { TopicUpdateUseCase } from '../useCases/update/topic.update.useCase'
import { TopicVersionSearchDTO } from '../dtos/search/topicVersion.search.dto'

export class TopicController {
    private topicSearchUseCase: TopicSearchUseCase

    private topicCreateUseCase: TopicCreateUseCase

    private topicUpdateUseCase: TopicUpdateUseCase

    constructor() {
        this.topicSearchUseCase = new TopicSearchUseCase()
        this.topicCreateUseCase = new TopicCreateUseCase()
        this.topicUpdateUseCase = new TopicUpdateUseCase()
    }

    public async getAllTopics(req: Request, res: Response): Promise<void> {
        try {
            const topics = await this.topicSearchUseCase.getAllTopics()
            res.json(topics)
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving topics', error })
        }
    }

    public async getTopicsByVersion(req: Request, res: Response): Promise<void> {
        const transform = new RequestTransformer<
            TopicVersionSearchDTO,
            { name: string; version: string }
        >()
        const { query } = transform.getValidData(req)
        try {
            const topics = await this.topicSearchUseCase.getTopicByVersion(
                query?.name,
                Number(query?.version),
            )
            res.json(topics)
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving topics', error })
        }
    }

    public async getTopicTreeById(req: Request, res: Response): Promise<void> {
        try {
            const topic = await this.topicSearchUseCase.getTreeById(
                Number(req.params.id),
            )
            if (topic) {
                res.json(topic)
            } else {
                res.status(404).json({ message: 'Topic not found' })
            }
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving topic', error })
        }
    }

    public async createTopic(req: Request, res: Response): Promise<void> {
        const transform = new RequestTransformer<CreateTopicDTO>()
        const { body } = transform.getValidData(req)

        try {
            const newTopic = await this.topicCreateUseCase.createTopic(body)
            res.status(201).json(newTopic)
        } catch (error) {
            res.status(500).json({ message: 'Error creating topic', error })
        }
    }

    public async updateTopic(req: Request, res: Response): Promise<void> {
        const transform = new RequestTransformer<
            UpdateTopicDTO,
            undefined,
            { id: string }
        >()

        const { body, params } = transform.getValidData(req)

        try {
            const updatedTopic = await this.topicUpdateUseCase.updateTopic(
                params?.id,
                body,
            )
            res.status(201).json(updatedTopic)
        } catch (error) {
            res.status(500).json({ message: 'Error updating topic', error })
        }
    }
}
