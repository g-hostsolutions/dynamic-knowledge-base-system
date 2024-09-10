import { Application, Router } from 'express'
import { TopicController } from '../../../modules/topics/controller/topics.controller'
import { checkUserRoleMiddleware } from '../../middlewares/userRoles/userAuth.middleware'
import { HealthController } from '../../../modules/health/controller/health.controller'

export class RouteFactory {
    private router: Router
    private topicController: TopicController
    private healthController: HealthController

    constructor() {
        this.router = Router()
        this.topicController = new TopicController()
        this.healthController = new HealthController()
        this.configureRoutes()
    }

    private bindPath<T>(controller: T, path: keyof T & string) {
        const method = controller[path]

        if (typeof method === 'function') {
            return method.bind(controller)
        }

        throw new Error(`Method ${path} is not a function on the controller`)
    }

    private configureHealthRoutes() {
        console.log('Server is configuring health routes')
        this.router.get('/health', this.healthController.checkHealth)

        console.log('Server deployed health routes')
    }

    private configureTopicRoutes() {
        console.log('Server is configuring topic routes')
        this.router.get(
            '/topics',
            checkUserRoleMiddleware,
            this.bindPath(this.topicController, 'getAllTopics'),
        )

        this.router.get(
            '/topics/:id',
            this.bindPath(this.topicController, 'getTopicTreeById'),
        )
        this.router.post(
            '/topics',
            this.bindPath(this.topicController, 'createTopic'),
        )
        console.log('Server deployed topic routes')
    }

    private configureRoutes(): void {
        console.log('Server is configuring routes...')
        this.configureHealthRoutes()
        this.configureTopicRoutes()
    }

    public applyRoutes(app: Application): void {
        app.use(this.router)
    }
}
