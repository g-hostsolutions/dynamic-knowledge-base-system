import { Request, Response, NextFunction } from 'express'
import { ValidationError } from 'express-validator'
import {
    HttpError,
    ValidatorError,
} from '../../../../common/validator/validatorErrors.validator'
import { ErrorHandler } from '../errorHandler.middleware'

const validationErrors = [
    {
        msg: 'Invalid name',
        param: 'name',
        location: 'body',
        value: 'John',
    } as unknown as ValidationError,
    {
        msg: 'Invalid email',
        param: 'email',
        location: 'body',
        value: 'example@example.com',
    },
] as ValidationError[]

describe('ErrorHandler', () => {
    let mockRequest: Partial<Request>
    let mockResponse: Partial<Response>
    let mockNext: NextFunction
    let statusMock: jest.Mock
    let jsonMock: jest.Mock

    beforeEach(() => {
        statusMock = jest.fn().mockReturnThis()
        jsonMock = jest.fn()
        mockRequest = {}
        mockResponse = {
            status: statusMock,
            json: jsonMock,
        }
        mockNext = jest.fn()
    })

    test('should handle ValidatorError and return status and errors', () => {
        const validatorError = new ValidatorError(validationErrors)

        ErrorHandler.handle(
            validatorError,
            mockRequest as Request,
            mockResponse as Response,
            mockNext,
        )

        expect(statusMock).toHaveBeenCalledWith(validatorError.statusCode)
        expect(jsonMock).toHaveBeenCalledWith({
            statusCode: validatorError.statusCode,
            message: validatorError.message,
            errors: validationErrors.map(error => ({
                param: error['param'] || null,
                msg: error.msg,
                location: error['location'] || null,
                value: error['value'] !== undefined ? error['value'] : null,
            })),
        })
    })

    test('should handle HttpError and return status and message', () => {
        const httpError = new HttpError(401, 'Unauthorized')

        ErrorHandler.handle(
            httpError,
            mockRequest as Request,
            mockResponse as Response,
            mockNext,
        )

        expect(statusMock).toHaveBeenCalledWith(httpError.statusCode)
        expect(jsonMock).toHaveBeenCalledWith({
            statusCode: httpError.statusCode,
            message: httpError.message,
        })
    })

    test('should handle generic errors and return 500 Internal Server Error', () => {
        const genericError = new Error('Something went wrong')

        ErrorHandler.handle(
            genericError,
            mockRequest as Request,
            mockResponse as Response,
            mockNext,
        )

        expect(statusMock).toHaveBeenCalledWith(500)
        expect(jsonMock).toHaveBeenCalledWith({
            statusCode: 500,
            message: 'Internal Server Error',
        })
    })
})
