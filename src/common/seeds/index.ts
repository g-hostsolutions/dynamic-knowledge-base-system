import { seedUsers } from './users.seed'

export const runAllSeeds = async () => {
    try {
        console.log('Running all seeds!')

        await seedUsers()
    } catch (err) {
        console.error('Error during seeding:', err)
    }
}
