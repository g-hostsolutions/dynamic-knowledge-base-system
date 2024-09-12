import { TopicEntity } from '../topics.entity'

describe('TopicEntity', () => {
    let parentTopic: TopicEntity
    let childTopic: TopicEntity

    beforeEach(() => {
        parentTopic = new TopicEntity()
        parentTopic.id = 1
        parentTopic.name = 'Parent Topic'
        parentTopic.content = 'Content of Parent Topic'
        parentTopic.version = 1
        parentTopic.parentTopicId = null
        parentTopic.children = []

        childTopic = new TopicEntity()
        childTopic.id = 2
        childTopic.name = 'Child Topic'
        childTopic.content = 'Content of Child Topic'
        childTopic.version = 1
        childTopic.parentTopicId = null
        childTopic.children = []
    })

    test('should add a child topic successfully', () => {
        parentTopic.add(childTopic)

        expect(parentTopic.children).toHaveLength(1)
        expect(parentTopic.children[0]).toEqual(childTopic)
        expect(childTopic.parent).toBe(parentTopic)
        expect(childTopic.parentTopicId).toBe(parentTopic.id)
    })

    test('should remove a child topic successfully', () => {
        parentTopic.add(childTopic)
        parentTopic.remove(childTopic)

        expect(parentTopic.children).toHaveLength(0)
        expect(childTopic.parent).toBeNull()
        expect(childTopic.parentTopicId).toBeNull()
    })

    test('should get children topics', () => {
        parentTopic.add(childTopic)

        const children = parentTopic.getChildren()

        expect(children).toHaveLength(1)
        expect(children[0]).toEqual(childTopic)
    })
})
