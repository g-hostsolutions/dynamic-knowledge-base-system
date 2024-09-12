import { AppDataSource } from '../../config/database/ormconfig'
import { TopicEntity } from '../../modules/topics/entity/topics.entity'

export const seedTopics = async () => {
    const topicRepository = AppDataSource.getRepository(TopicEntity)

    const existingTopics = await topicRepository.find()
    if (existingTopics.length > 0) {
        console.log('Topics already seeded.')
        return
    }

    const rootTopic = new TopicEntity()
    rootTopic.name = 'Social Media Trends'
    rootTopic.content =
        'Discussing the latest trends and changes in the social media landscape.'
    rootTopic.parentTopicId = null
    await topicRepository.save(rootTopic)

    const childTopic1 = new TopicEntity()
    childTopic1.name = 'Influencer Marketing'
    childTopic1.content =
        'How brands are leveraging influencers to reach new audiences.'
    childTopic1.parentTopicId = rootTopic.id
    await topicRepository.save(childTopic1)

    const childTopic2 = new TopicEntity()
    childTopic2.name = 'Content Creation Strategies'
    childTopic2.content =
        'Best practices for creating engaging content on social media platforms.'
    childTopic2.parentTopicId = rootTopic.id
    await topicRepository.save(childTopic2)

    const grandchildTopic1 = new TopicEntity()
    grandchildTopic1.name = 'Instagram Trends'
    grandchildTopic1.content =
        'Exploring the rise of Reels and Stories as primary engagement tools.'
    grandchildTopic1.parentTopicId = childTopic1.id
    await topicRepository.save(grandchildTopic1)

    const grandchildTopic2 = new TopicEntity()
    grandchildTopic2.name = 'TikTok Growth Hacks'
    grandchildTopic2.content =
        'Strategies for gaining followers and engagement quickly on TikTok.'
    grandchildTopic2.parentTopicId = childTopic1.id
    await topicRepository.save(grandchildTopic2)

    const grandchildTopic3 = new TopicEntity()
    grandchildTopic3.name = 'YouTube Monetization'
    grandchildTopic3.content =
        'Tips for maximizing ad revenue and sponsorships on YouTube.'
    grandchildTopic3.parentTopicId = childTopic2.id
    await topicRepository.save(grandchildTopic3)

    const grandchildTopic4 = new TopicEntity()
    grandchildTopic4.name = 'Facebook Ad Campaigns'
    grandchildTopic4.content =
        'Optimizing paid social media campaigns on Facebook for better ROI.'
    grandchildTopic4.parentTopicId = childTopic2.id
    await topicRepository.save(grandchildTopic4)

    const greatGrandchildTopic1 = new TopicEntity()
    greatGrandchildTopic1.name = 'Instagram Influencer Tools'
    greatGrandchildTopic1.content =
        'Review of the latest tools and platforms for influencer collaborations.'
    greatGrandchildTopic1.parentTopicId = grandchildTopic1.id
    await topicRepository.save(greatGrandchildTopic1)

    const greatGrandchildTopic2 = new TopicEntity()
    greatGrandchildTopic2.name = 'TikTok Viral Challenges'
    greatGrandchildTopic2.content =
        'How viral challenges on TikTok are shaping social media culture.'
    greatGrandchildTopic2.parentTopicId = grandchildTopic2.id
    await topicRepository.save(greatGrandchildTopic2)

    const greatGrandchildTopic3 = new TopicEntity()
    greatGrandchildTopic3.name = 'YouTube Channel Growth'
    greatGrandchildTopic3.content =
        'Techniques to increase subscribers and views organically.'
    greatGrandchildTopic3.parentTopicId = grandchildTopic3.id
    await topicRepository.save(greatGrandchildTopic3)

    const greatGrandchildTopic4 = new TopicEntity()
    greatGrandchildTopic4.name = 'Facebook Audience Targeting'
    greatGrandchildTopic4.content =
        'Advanced strategies for targeting specific demographics in Facebook ads.'
    greatGrandchildTopic4.parentTopicId = grandchildTopic4.id
    await topicRepository.save(greatGrandchildTopic4)

    const greatGreatGrandchildTopic1 = new TopicEntity()
    greatGreatGrandchildTopic1.name = 'Instagram Algorithm Insights'
    greatGreatGrandchildTopic1.content =
        'Understanding how Instagram’s algorithm affects content visibility.'
    greatGreatGrandchildTopic1.parentTopicId = greatGrandchildTopic1.id
    await topicRepository.save(greatGreatGrandchildTopic1)

    const greatGreatGrandchildTopic2 = new TopicEntity()
    greatGreatGrandchildTopic2.name = 'TikTok For Business'
    greatGreatGrandchildTopic2.content =
        'How businesses are leveraging TikTok to drive brand awareness.'
    greatGreatGrandchildTopic2.parentTopicId = greatGrandchildTopic2.id
    await topicRepository.save(greatGreatGrandchildTopic2)

    const greatGreatGrandchildTopic3 = new TopicEntity()
    greatGreatGrandchildTopic3.name = 'YouTube Shorts Success'
    greatGreatGrandchildTopic3.content =
        'Best practices for creating viral short-form content on YouTube.'
    greatGreatGrandchildTopic3.parentTopicId = greatGrandchildTopic3.id
    await topicRepository.save(greatGreatGrandchildTopic3)

    const greatGreatGrandchildTopic4 = new TopicEntity()
    greatGreatGrandchildTopic4.name = 'Facebook Ad Retargeting'
    greatGreatGrandchildTopic4.content =
        'How to effectively use retargeting in Facebook ads to boost conversions.'
    greatGreatGrandchildTopic4.parentTopicId = greatGrandchildTopic4.id
    await topicRepository.save(greatGreatGrandchildTopic4)

    console.log('Topics have been seeded.')
}
