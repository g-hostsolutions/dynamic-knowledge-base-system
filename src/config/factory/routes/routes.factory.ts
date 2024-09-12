import { Application, Router } from 'express'
import { TopicController } from '../../../modules/topics/controller/topics.controller'
import { HealthController } from '../../../modules/health/controller/health.controller'
import { CreateTopicDTO } from '../../../modules/topics/dtos/topic.create.dto'
import { ClassValidator } from '../../../common/validator/classValidator.validator'
import { CheckUserPermissionMiddleware } from '../../middlewares/userRoles/checkUser.middleware'
import { UpdateTopicDTO } from '../../../modules/topics/dtos/topic.update.dto'
import { TopicSearchDTO } from '../../../modules/topics/dtos/search/topic.search.dto'
import { TopicVersionSearchDTO } from '../../../modules/topics/dtos/search/topicVersion.search.dto'
import { TopicPathFinderDTO } from '../../../modules/topics/dtos/search/topicPathFinder.dto'

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
        console.log('Configuring health routes')
        this.router.get(
            '/health',
            this.bindPath(this.healthController, 'checkHealth'),
        )
    }

    private configureTopicRoutes() {
        console.log('Configuring topic routes')
        this.router.get(
            '/topics',
            CheckUserPermissionMiddleware.checkPermissions({ canView: true }),
            this.bindPath(this.topicController, 'getAllTopics'),
        )

        this.router.get(
            '/topics/version',
            CheckUserPermissionMiddleware.checkPermissions({ canView: true }),
            ClassValidator.validateAndThrow(TopicVersionSearchDTO),
            this.bindPath(this.topicController, 'getTopicsByVersion'),
        )

        this.router.get(
            '/topics/pathFinder',
            CheckUserPermissionMiddleware.checkPermissions({ canView: true }),
            ClassValidator.validateAndThrow(TopicPathFinderDTO),
            this.bindPath(this.topicController, 'getShortestPath'),
        )

        this.router.get(
            '/topics/:id',
            CheckUserPermissionMiddleware.checkPermissions({ canView: true }),
            ClassValidator.validateAndThrow(TopicSearchDTO),
            this.bindPath(this.topicController, 'getTopicTreeById'),
        )

        this.router.post(
            '/topics',
            CheckUserPermissionMiddleware.checkPermissions({ canCreate: true }),
            ClassValidator.validateAndThrow(CreateTopicDTO),
            this.bindPath(this.topicController, 'createTopic'),
        )

        this.router.put(
            '/topics/:id',
            CheckUserPermissionMiddleware.checkPermissions({ canEdit: true }),
            ClassValidator.validateAndThrow(UpdateTopicDTO),
            this.bindPath(this.topicController, 'updateTopic'),
        )
    }

    private configureRoutes(): void {
        console.log('Configuring routes...')
        this.configureHealthRoutes()
        this.configureTopicRoutes()
    }

    public applyRoutes(app: Application): void {
        app.use(this.router)
    }
}
