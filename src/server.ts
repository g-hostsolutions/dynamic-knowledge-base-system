import 'reflect-metadata'
import { ServerFactory } from './config/factory/server/server.factory'

const startServer = async () => {
    try {
        const PORT = process.env.PORT || 3000
        const serverFactory = new ServerFactory()
        serverFactory.start(Number(PORT))
        console.log('Server started successfully.')

        process.on('SIGTERM', () => {
            console.log('SIGTERM received. Preparing to shut down...')
            serverFactory.stop()
        })

        process.on('SIGINT', () => {
            console.log('SIGINT received. Preparing to shut down...')
            serverFactory.stop()
        })
    } catch (error) {
        console.error('Error starting server:', error)
        process.exit(1)
    }
}

startServer()
