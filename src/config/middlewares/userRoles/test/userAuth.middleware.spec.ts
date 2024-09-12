import { Request, Response, NextFunction } from 'express'
import { UserEntity } from '../../../../modules/users/entity/users.entity'
import { AppDataSource } from '../../../database/ormconfig'
import { UserContext } from '../user.context'
import { checkUserRoleMiddleware } from '../userAuth.middleware'
import { UserRole } from '../../../../common/enum/roles/user.role.enum'

jest.mock('../../../database/ormconfig', () => ({
    AppDataSource: {
        getRepository: jest.fn().mockReturnValue({
            findOne: jest.fn(),
        }),
    },
}))

jest.mock('../user.context', () => ({
    UserContext: jest.fn().mockImplementation(() => ({
        canCreate: jest.fn(),
        canView: jest.fn(),
        canEdit: jest.fn(),
        canDelete: jest.fn(),
    })),
}))

describe('checkUserRoleMiddleware', () => {
    let mockRequest: Partial<Request>
    let mockResponse: Partial<Response>
    let nextFunction: NextFunction
    let mockFindOne: jest.Mock

    beforeEach(() => {
        jest.resetModules()
        jest.clearAllMocks()

        mockFindOne = jest.fn()
        ;(AppDataSource.getRepository as jest.Mock).mockReturnValue({
            findOne: mockFindOne,
        })

        mockRequest = {
            headers: {},
        }
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        }
        nextFunction = jest.fn()
    })

    test('should return 400 if user email is missing in headers', async () => {
        await checkUserRoleMiddleware(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction,
        )

        expect(mockResponse.status).toHaveBeenCalledWith(400)
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: 'User email is required in headers',
        })
    })

    test('should return 404 if user is not found in the database', async () => {
        mockRequest.headers['useremail'] = 'nonexistent@example.com'
        mockFindOne.mockResolvedValue(null)

        await checkUserRoleMiddleware(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction,
        )

        expect(mockResponse.status).toHaveBeenCalledWith(404)
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: 'User not found',
        })
    })

    test('should set user permissions and call next if user is found', async () => {
        mockRequest.headers['useremail'] = 'user@example.com'

        const mockUser = new UserEntity()
        mockUser.role = 'Admin' as UserRole
        mockFindOne.mockResolvedValue(mockUser)

        const mockUserContext = {
            canCreate: jest.fn().mockReturnValue(true),
            canView: jest.fn().mockReturnValue(true),
            canEdit: jest.fn().mockReturnValue(true),
            canDelete: jest.fn().mockReturnValue(true),
        }

        ;(UserContext as jest.Mock).mockImplementation(() => mockUserContext)

        await checkUserRoleMiddleware(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction,
        )

        expect(mockRequest['userPermissions']).toEqual({
            canCreate: true,
            canView: true,
            canEdit: true,
            canDelete: true,
        })
        expect(nextFunction).toHaveBeenCalled()
    })
})
