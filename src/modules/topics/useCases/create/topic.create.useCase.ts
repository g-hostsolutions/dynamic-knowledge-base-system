import { CreateTopicDTO } from '../../dtos/topic.create.dto'
import { TopicEntity } from '../../entity/topics.entity'
import { TopicRepository } from '../../repository/topics.repository'

export class TopicCreateUseCase {
    private topicRepository: TopicRepository

    constructor() {
        this.topicRepository = new TopicRepository()
    }

    public async createTopic(topic: CreateTopicDTO): Promise<TopicEntity> {
        return this.topicRepository.createTopic(topic)
    }
}
