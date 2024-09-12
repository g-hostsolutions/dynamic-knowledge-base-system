import express, { Application } from 'express'
import { RouteFactory } from '../routes.factory'

describe('RouteFactory', () => {
    let app: Application
    let routeFactory: RouteFactory
    let useSpy: jest.SpyInstance

    beforeAll(() => {
        app = express()
        routeFactory = new RouteFactory()
        useSpy = jest.spyOn(app, 'use')

        routeFactory.applyRoutes(app)
    })

    afterAll(() => {
        useSpy.mockRestore()
    })

    test('should define RouteFactory', () => {
        expect(routeFactory).toBeDefined()
    })

    test('should apply routes to the express application', () => {
        expect(useSpy).toHaveBeenCalled()
        const [router] = useSpy.mock.calls[0]
        expect(router).toBeDefined()
    })
})
