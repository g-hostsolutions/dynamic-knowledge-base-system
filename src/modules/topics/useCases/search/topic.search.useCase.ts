import { AppDataSource } from '../../../../config/database/ormconfig'
import { TopicEntity } from '../../entity/topics.entity'

export class TopicSearchUseCase {
    private topicRepository = AppDataSource.getTreeRepository(TopicEntity)

    public async getAllTopics(): Promise<TopicEntity[]> {
        return this.topicRepository.find({ relations: ['children', 'parent'] })
    }

    public async getTreeById(id: number): Promise<TopicEntity> {
        return this.topicRepository.findDescendantsTree({ id } as TopicEntity)
    }
}
