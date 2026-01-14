import { Application, Router } from 'express'
import { HealthController } from '../../../modules/health/controller/health.controller'
import { UserController } from '../../../modules/users/controller/users.controller'

export class RouteFactory {
    private router: Router

    private healthController: HealthController

    private userController: UserController

    constructor() {
        this.router = Router()
        this.healthController = new HealthController()
        this.userController = new UserController()
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

    private configureUsersRoutes() {
        console.log('Configuring users routes')
        this.router.get('/users', this.bindPath(this.userController, 'getAllUsers'))
    }

    private configureRoutes(): void {
        console.log('Configuring routes...')
        this.configureHealthRoutes()
        this.configureUsersRoutes()
    }

    public applyRoutes(app: Application): void {
        app.use(this.router)
    }
}
