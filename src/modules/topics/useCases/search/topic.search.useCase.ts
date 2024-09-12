import { NotFoundError } from '../../../../common/errors/notFoundError'
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

    public async getShortestPath(
        sourceId: number,
        targetId: number,
    ): Promise<{ shortestPath: number[] }> {
        const sourceTopic = await this.topicRepository.getTreeById(sourceId)

        const targetTopic = await this.topicRepository.findOne({
            where: { id: targetId },
        })

        if (!sourceTopic) throw new NotFoundError('Source topics do not exist')

        if (!targetTopic) throw new NotFoundError('Target topics do not exist')

        const queue: { node: TopicEntity; path: number[] }[] = []

        queue.push({ node: sourceTopic, path: [sourceTopic.id] })

        while (queue.length > 0) {
            const { node, path } = queue.shift()

            if (node.id === targetId) {
                return { shortestPath: path }
            }

            for (const child of node.children) {
                queue.push({ node: child, path: [...path, child.id] })
            }
        }

        throw new NotFoundError('No path found between the topics')
    }
}
