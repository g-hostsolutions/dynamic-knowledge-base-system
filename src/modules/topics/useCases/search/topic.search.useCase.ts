import { TopicEntity } from '../../entity/topics.entity'
import { TopicRepository } from '../../repository/topics.repository'

export class TopicSearchUseCase {
    private topicRepository: TopicRepository

    constructor() {
        this.topicRepository = new TopicRepository()
    }

    public async getAllTopics(): Promise<TopicEntity[]> {
        return this.topicRepository.findAll()
    }

    public async getTreeById(id: number): Promise<TopicEntity> {
        return this.topicRepository.getTreeById(id)
    }

    public async getTopicByVersion(
        name: string,
        version: number,
    ): Promise<TopicEntity> {
        return this.topicRepository.getTopicByVersion(name, version)
    }
}
