import { AppDataSource } from '../../config/database/ormconfig'
import { TopicEntity } from '../../modules/topics/entity/topics.entity'

export const seedTopics = async () => {
    const topicRepository = AppDataSource.getRepository(TopicEntity)

    const existingTopics = await topicRepository.find()
    if (existingTopics.length > 0) {
        console.log('Topics already seeded.')
        return
    }

    // Create root topic
    const rootTopic = topicRepository.create({
        name: 'Root Topic',
        content: 'This is the root topic.',
    })
    const root = await topicRepository.save(rootTopic)

    // Create level 1 child topics
    const childTopic1 = topicRepository.create({
        name: 'Child Topic 1',
        content: 'This is child topic 1.',
        parent: root,
    })
    const child1 = await topicRepository.save(childTopic1)

    const childTopic2 = topicRepository.create({
        name: 'Child Topic 2',
        content: 'This is child topic 2.',
        parent: root,
    })
    const child2 = await topicRepository.save(childTopic2)

    // Create level 2 grandchild topics
    const grandchildTopic1 = topicRepository.create({
        name: 'Grandchild Topic 1',
        content: 'This is grandchild topic 1.',
        parent: child1,
    })
    const grandchild1 = await topicRepository.save(grandchildTopic1)

    const grandchildTopic2 = topicRepository.create({
        name: 'Grandchild Topic 2',
        content: 'This is grandchild topic 2.',
        parent: child1,
    })
    const grandchild2 = await topicRepository.save(grandchildTopic2)

    const grandchildTopic3 = topicRepository.create({
        name: 'Grandchild Topic 3',
        content: 'This is grandchild topic 3.',
        parent: child2,
    })
    const grandchild3 = await topicRepository.save(grandchildTopic3)

    const grandchildTopic4 = topicRepository.create({
        name: 'Grandchild Topic 4',
        content: 'This is grandchild topic 4.',
        parent: child2,
    })
    const grandchild4 = await topicRepository.save(grandchildTopic4)

    // Create level 3 great-grandchild topics
    const greatGrandchildTopic1 = topicRepository.create({
        name: 'Great-Grandchild Topic 1',
        content: 'This is great-grandchild topic 1.',
        parent: grandchild1,
    })
    const greatGrandchild1 = await topicRepository.save(greatGrandchildTopic1)

    const greatGrandchildTopic2 = topicRepository.create({
        name: 'Great-Grandchild Topic 2',
        content: 'This is great-grandchild topic 2.',
        parent: grandchild1,
    })
    const greatGrandchild2 = await topicRepository.save(greatGrandchildTopic2)

    const greatGrandchildTopic3 = topicRepository.create({
        name: 'Great-Grandchild Topic 3',
        content: 'This is great-grandchild topic 3.',
        parent: grandchild3,
    })
    const greatGrandchild3 = await topicRepository.save(greatGrandchildTopic3)

    const greatGrandchildTopic4 = topicRepository.create({
        name: 'Great-Grandchild Topic 4',
        content: 'This is great-grandchild topic 4.',
        parent: grandchild4,
    })
    const greatGrandchild4 = await topicRepository.save(greatGrandchildTopic4)

    // Create level 4 great-great-grandchild topics
    const greatGreatGrandchildTopic1 = topicRepository.create({
        name: 'Great-Great-Grandchild Topic 1',
        content: 'This is great-great-grandchild topic 1.',
        parent: greatGrandchild1,
    })
    await topicRepository.save(greatGreatGrandchildTopic1)

    const greatGreatGrandchildTopic2 = topicRepository.create({
        name: 'Great-Great-Grandchild Topic 2',
        content: 'This is great-great-grandchild topic 2.',
        parent: greatGrandchild2,
    })
    await topicRepository.save(greatGreatGrandchildTopic2)

    const greatGreatGrandchildTopic3 = topicRepository.create({
        name: 'Great-Great-Grandchild Topic 3',
        content: 'This is great-great-grandchild topic 3.',
        parent: greatGrandchild3,
    })
    await topicRepository.save(greatGreatGrandchildTopic3)

    const greatGreatGrandchildTopic4 = topicRepository.create({
        name: 'Great-Great-Grandchild Topic 4',
        content: 'This is great-great-grandchild topic 4.',
        parent: greatGrandchild4,
    })
    await topicRepository.save(greatGreatGrandchildTopic4)

    console.log('Topics have been seeded.')
}
