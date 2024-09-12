/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-require-imports */
import { Request, Response, NextFunction } from 'express'
import { authMiddleware } from '../auth.middleware'

jest.mock('../auth.middleware', () => ({
    ...jest.requireActual('../auth.middleware'),
    validateToken: jest.fn(),
}))

describe('authMiddleware', () => {
    let mockRequest: Partial<Request>
    let mockResponse: Partial<Response>
    let nextFunction: NextFunction

    beforeEach(() => {
        mockRequest = {
            headers: {},
        }
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        }
        nextFunction = jest.fn()
    })

    test('should return 401 if token is missing', () => {
        mockRequest.headers = {}

        authMiddleware(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction,
        )

        expect(mockResponse.status).toHaveBeenCalledWith(401)
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Token missing' })
        expect(nextFunction).not.toHaveBeenCalled()
    })

    test('should return 403 if token is invalid', () => {
        mockRequest.headers = { authorization: 'Bearer invalidtoken' }

        const { validateToken } = require('../auth.middleware')
        validateToken.mockReturnValue(false)

        authMiddleware(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction,
        )

        expect(mockResponse.status).toHaveBeenCalledWith(403)
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Token invalid' })
        expect(nextFunction).not.toHaveBeenCalled()
    })

    test('should call next if token is valid', () => {
        mockRequest.headers = {
            authorization: 'Bearer 4f6b3d0e9c5f8a7e2d1a9b4c5e7f8d9a',
        }

        const { validateToken } = require('../auth.middleware')
        validateToken.mockReturnValue(true)

        authMiddleware(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction,
        )

        expect(mockResponse.status).not.toHaveBeenCalled()
        expect(mockResponse.json).not.toHaveBeenCalled()
        expect(nextFunction).toHaveBeenCalled()
    })
})
