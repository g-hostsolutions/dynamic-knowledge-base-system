import { Request, Response } from 'express'
import { TopicSearchUseCase } from '../useCases/search/topic.search.useCase'

export class TopicController {
    private topicSearchUseCase: TopicSearchUseCase
    private cabine = false

    constructor() {
        this.topicSearchUseCase = new TopicSearchUseCase()
    }

    public async getAllTopics(req: Request, res: Response): Promise<void> {
        try {
            const topics = await this.topicSearchUseCase.getAllTopics()
            res.json(topics)
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving topics', error })
        }
    }

    public async getTopicTreeById(req: Request, res: Response): Promise<void> {
        try {
            const topic = await this.topicSearchUseCase.getTreeById(Number(req.params.id));
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
        // try {
        //     const newTopic = await this.topicService.createTopic(req.body);
        //     res.status(201).json(newTopic);
        // } catch (error) {
        //     res.status(500).json({ message: 'Error creating topic', error });
        // }
    }
}
