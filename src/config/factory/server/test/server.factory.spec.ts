import { Server } from 'http'
import { ServerFactory } from '../server.factory'
import { AppDataSource } from '../../../database/ormconfig'
import { runAllSeeds } from '../../../../common/seeds'

jest.useFakeTimers()

jest.mock('../../../../common/seeds', () => ({
    runAllSeeds: jest.fn().mockResolvedValue(undefined),
}))

jest.mock('../../../database/ormconfig', () => ({
    AppDataSource: {
        initialize: jest.fn().mockResolvedValue(undefined),
        destroy: jest.fn().mockResolvedValue(undefined),
        isInitialized: false,
        getRepository: jest.fn().mockReturnValue({
            find: jest.fn().mockResolvedValue([]),
            save: jest.fn().mockResolvedValue({}),
        }),
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
        jest.clearAllTimers()
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

        const runAllSeedsMock = jest.mocked(runAllSeeds).mockResolvedValue(undefined)

        await serverFactory.start(3099)

        expect(serverFactory['server']).not.toBeNull()
        expect(initializeMock).toHaveBeenCalled()
        expect(runAllSeedsMock).toHaveBeenCalled()
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
        const handleShutdownMock = jest.spyOn(serverFactory as any, 'handleShutdown')

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
