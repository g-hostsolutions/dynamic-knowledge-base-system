import { seedResources } from './resources.seed'
import { seedTopics } from './topics.seed'
import { seedUsers } from './users.seed'

export const runAllSeeds = async () => {
    try {
        console.log('Running all seeds!')

        await seedUsers()
        await seedTopics()
        await seedResources()
    } catch (err) {
        console.error('Error during seeding:', err)
    }
}
