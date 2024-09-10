import express, { Application } from 'express'
import bodyParser from 'body-parser'
import { Server } from 'http'
import { AppDataSource } from '../../database/ormconfig'
import { RouteFactory } from '../routes/routes.factory'
import { runAllSeeds } from '../../../common/seeds'
import { authMiddleware } from '../../middlewares/auth/auth.middleware'

export class ServerFactory {
    private app: Application
    private server: Server | null = null

    constructor() {
        this.app = express()
        this.configureMiddleware()
        this.configureRoutes()
    }

    public getApp(): Application {
        return this.app
    }

    private configureMiddleware(): void {
        console.log('Server is configuring middlewares...')
        this.app.use(bodyParser.json())
        this.app.use(authMiddleware)
    }

    private configureRoutes(): void {
        const routeFactory = new RouteFactory()
        routeFactory.applyRoutes(this.app)
    }

    private async initializeDatabase(): Promise<void> {
        try {
            await AppDataSource.initialize().then(async () => {
                if (process.env.NODE_ENV !== 'TEST') await runAllSeeds()
                console.log('Database has been initialized!')
            })
        } catch (error) {
            console.error('Error during Data Source initialization:', error)
            throw new Error(error)
        }
    }

    public async start(port: number): Promise<void> {
        try {
            await this.initializeDatabase()
            this.server = this.app.listen(port, () => {
                console.log(`Server running on port ${port}`)
            })
        } catch (error) {
            console.error('Error starting server:', error)
        }
    }

    private async stopDatabase(): Promise<void> {
        if (AppDataSource.isInitialized) {
            try {
                await AppDataSource.destroy()
                console.log('Database connection closed.')
            } catch (error) {
                console.error('Error closing database connection:', error?.message)
            }
        }
    }

    private handleShutdown = async () => {
        if (this.server) {
            console.log('No active requests, shutting down the server...')
            return this.server.close(async err => {
                if (err) {
                    console.error('Error during shutdown:', err)
                }
                await this.stopDatabase()
                console.log('Server stopped.')
            })
        }

        throw Error('Server is not defined!')
    }

    public async stop(): Promise<void> {
        console.log(
            'Graceful shutdown initiated. Waiting for ongoing requests to finish...',
        )

        await this.handleShutdown()
    }
}
