import { Server } from 'http'
import request from 'supertest'
import { ServerFactory } from '../server.factory'
import { AppDataSource } from '../../../database/ormconfig'

jest.useFakeTimers()

jest.mock('../../../database/ormconfig', () => ({
    AppDataSource: {
        initialize: jest.fn(),
        destroy: jest.fn(),
        isInitialized: false,
    },
}))

jest.mock('../../routes/routes.factory', () => ({
    RouteFactory: jest.fn().mockImplementation(() => ({
        applyRoutes: jest.fn(),
    })),
}))

describe('ServerFactory', () => {
    let serverFactory: ServerFactory

    beforeAll(() => {
        jest.spyOn(console, 'log').mockImplementation(() => undefined)
    })

    beforeEach(() => {
        serverFactory = new ServerFactory()
    })

    afterEach(async () => {
        if (serverFactory['server']) {
            await serverFactory.stop()
        }
    })

    afterAll(() => {
        jest.restoreAllMocks()
    })

    test('should initialize ServerFactory', () => {
        expect(serverFactory).toBeDefined()
    })

    test('should call initializeDatabase on start', async () => {
        const initializeMock = jest
            .spyOn(AppDataSource, 'initialize')
            .mockResolvedValue(undefined)

        await serverFactory.start(3099)

        console.log('Server initialized and started.')

        expect(serverFactory['server']).not.toBeNull()
        expect(initializeMock).toHaveBeenCalled()
    })

    test('should configure middleware correctly', async () => {
        const factory = new ServerFactory()
        const app = factory.getApp()

        app.use((req, res, _) => {
            res.send('Middleware configured')
        })

        const response = await request(app).get('/')
        expect(response.text).toBe('Middleware configured')
    })

    test('should call stopDatabase on shutdown', async () => {
        const stopDatabaseMock = jest
            .spyOn(serverFactory as any, 'stopDatabase')
            .mockResolvedValue(undefined)

        await serverFactory.start(3098)

        jest.spyOn(serverFactory['server']!, 'close').mockImplementation(cb => {
            cb()
            return serverFactory['server']! as unknown as Server
        })

        await serverFactory.stop()

        jest.runAllTimers()

        expect(stopDatabaseMock).toHaveBeenCalled()
    })

    test('should handle shutdown correctly', async () => {
        const closeMock = jest.fn()
        const handleShutdownMock = jest.spyOn(
            serverFactory as any,
            'handleShutdown',
        )

        await serverFactory.start(3097)

        jest.spyOn(serverFactory['server']!, 'close').mockImplementation(cb => {
            closeMock()
            if (cb) cb()
            return serverFactory?.['server'] as unknown as Server
        })

        await serverFactory.stop()

        jest.runAllTimers()

        expect(handleShutdownMock).toHaveBeenCalled()
        expect(closeMock).toHaveBeenCalled()
    })
})
