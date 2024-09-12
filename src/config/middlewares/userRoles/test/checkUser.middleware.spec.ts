import { Request, Response, NextFunction } from 'express'
import { CheckUserPermissionMiddleware } from '../checkUser.middleware'
import { UserPermissions } from '../strat/interface/user.strat.interface'

describe('CheckUserPermissionMiddleware', () => {
    let mockRequest: Partial<Request>
    let mockResponse: Partial<Response>
    let nextFunction: NextFunction

    beforeEach(() => {
        mockRequest = {
            userPermissions: {} as UserPermissions,
        } as Partial<Request>
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as Partial<Response>
        nextFunction = jest.fn()
    })

    test('should return 403 if user permissions are not found', async () => {
        ;(mockRequest as Request)['userPermissions'] = undefined

        const middleware = CheckUserPermissionMiddleware.checkPermissions({
            canCreate: true,
            canView: true,
            canEdit: true,
            canDelete: true,
        })

        await middleware(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction,
        )

        expect(mockResponse.status).toHaveBeenCalledWith(403)
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: 'User permissions not found',
        })
        expect(nextFunction).not.toHaveBeenCalled()
    })

    test('should return 403 if user does not have the required permission', async () => {
        ;(mockRequest as Request)['userPermissions'] = {
            canCreate: false,
            canView: true,
            canEdit: true,
            canDelete: true,
        } as UserPermissions

        const middleware = CheckUserPermissionMiddleware.checkPermissions({
            canCreate: true,
        })

        await middleware(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction,
        )

        expect(mockResponse.status).toHaveBeenCalledWith(403)
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: 'User does not have canCreate permission',
        })
        expect(nextFunction).not.toHaveBeenCalled()
    })

    test('should call next if user has all required permissions', async () => {
        ;(mockRequest as Request)['userPermissions'] = {
            canCreate: true,
            canView: true,
            canEdit: true,
            canDelete: true,
        } as UserPermissions

        const middleware = CheckUserPermissionMiddleware.checkPermissions({
            canCreate: true,
            canView: true,
        })

        await middleware(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction,
        )

        expect(mockResponse.status).not.toHaveBeenCalled()
        expect(mockResponse.json).not.toHaveBeenCalled()
        expect(nextFunction).toHaveBeenCalled()
    })
})
