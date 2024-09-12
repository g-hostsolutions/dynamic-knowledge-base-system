import { DeepPartial, FindManyOptions } from 'typeorm'
import { TopicEntity } from '../entity/topics.entity'
import { BaseRepository } from '../../../common/repository/base.repository'
import { NotFoundError } from '../../../common/errors/notFoundError'
import { UpdateTopicDTO } from '../dtos/topic.update.dto'

export class TopicRepository extends BaseRepository<TopicEntity> {
    constructor() {
        super(TopicEntity)
    }

    public async createTopic(topic: DeepPartial<TopicEntity>): Promise<TopicEntity> {
        const entity = this.repository.create(topic)
        return this.repository.save(entity)
    }

    public async getAllTopics(
        options?: FindManyOptions<TopicEntity>,
    ): Promise<TopicEntity[]> {
        return this.findAll(options)
    }

    public async getTreeById(id: number): Promise<TopicEntity> {
        const rootTopic = await this.repository.findOne({
            where: { id },
            relations: ['children'],
        })

        if (!rootTopic) {
            throw new NotFoundError(`Topic with ID ${id} not found`)
        }

        return this.buildTree(rootTopic)
    }

    private async buildTree(topic: TopicEntity): Promise<TopicEntity> {
        const children = await this.repository.find({
            where: { parentTopicId: topic.id },
            relations: ['children'],
        })

        topic.children = children

        for (const child of children) {
            await this.buildTree(child)
        }

        return topic
    }

    async getTopicByVersion(name: string, version: number): Promise<TopicEntity> {
        const topic = await this.repository.findOne({
            where: { name, version },
        })

        if (!topic) {
            throw new NotFoundError(
                `Topic with name ${name} and version ${version} not found`,
            )
        }

        return topic
    }

    public async updateTopic(
        lastTopic: TopicEntity,
        topic: UpdateTopicDTO,
    ): Promise<TopicEntity> {
        delete lastTopic?.id

        const newTopic = this.repository.create({
            ...lastTopic,
            ...topic,
            version: Number(lastTopic.version + 1),
        })

        const result = await this.repository.save(newTopic)

        if (newTopic.children?.length) {
            const childrens = lastTopic?.children?.map(child => {
                const newChild = this.repository.create({
                    ...child,
                    parentTopicId: result?.id,
                })

                return newChild
            }) as unknown as TopicEntity[]

            await this.repository.save(childrens)
        }

        return result
    }
}
