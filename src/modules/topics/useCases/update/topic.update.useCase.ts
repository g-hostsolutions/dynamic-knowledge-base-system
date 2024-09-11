import { NotFoundError } from '../../../../common/errors/notFoundError'
import { UpdateTopicDTO } from '../../dtos/topic.update.dto'
import { TopicEntity } from '../../entity/topics.entity'
import { TopicRepository } from '../../repository/topics.repository'

export class TopicUpdateUseCase {
    private topicRepository: TopicRepository

    constructor() {
        this.topicRepository = new TopicRepository()
    }

    public async updateTopic(
        id: string,
        topic: UpdateTopicDTO,
    ): Promise<TopicEntity> {
        const lastTopic = await this.topicRepository.findOne({
            where: { id: Number(id) },
            relations: ['children'],
        })

        if (!lastTopic) throw new NotFoundError(`Topic with id ${id} not found`)

        return this.topicRepository.updateTopic(lastTopic, topic)
    }
}
