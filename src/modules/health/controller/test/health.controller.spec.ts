import { Request, Response } from 'express'
import { HealthController } from '../health.controller'
import { AppDataSource } from '../../../../config/database/ormconfig'

jest.mock('../../../../config/database/ormconfig', () => ({
    AppDataSource: {
        isInitialized: true,
    },
}))

describe('HealthController', () => {
    let controller: HealthController
    let mockRequest: Partial<Request>
    let mockResponse: jest.Mocked<Response>

    beforeEach(() => {
        controller = new HealthController()
        mockRequest = {}
        mockResponse = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        } as unknown as jest.Mocked<Response>
    })

    test('should return status UP when database is initialized', async () => {
        ;(AppDataSource as any).isInitialized = true

        await controller.checkHealth(
            mockRequest as Request,
            mockResponse as Response,
        )

        expect(mockResponse.status).toHaveBeenCalledWith(200)
        expect(mockResponse.json).toHaveBeenCalledWith({ status: 'UP' })
    })

    test('should return status DOWN with message when database is not initialized', async () => {
        ;(AppDataSource as any).isInitialized = false

        await controller.checkHealth(
            mockRequest as Request,
            mockResponse as Response,
        )

        expect(mockResponse.status).toHaveBeenCalledWith(500)
        expect(mockResponse.json).toHaveBeenCalledWith({
            status: 'DOWN',
            message: 'Database not initialized',
        })
    })

    test('should handle error while checking health', async () => {
        const originalIsInitialized = AppDataSource.isInitialized
        Object.defineProperty(AppDataSource, 'isInitialized', {
            get: () => {
                throw new Error('Simulated error')
            },
        })

        await controller.checkHealth(
            mockRequest as Request,
            mockResponse as Response,
        )

        Object.defineProperty(AppDataSource, 'isInitialized', {
            get: () => originalIsInitialized,
        })

        expect(mockResponse.status).toHaveBeenCalledWith(500)
        expect(mockResponse.json).toHaveBeenCalledWith({
            status: 'DOWN',
            message: 'Error checking health',
            error: expect.any(Error),
        })
    })
})
