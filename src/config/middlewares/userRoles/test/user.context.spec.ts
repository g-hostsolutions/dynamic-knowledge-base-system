import { UserRoleStrategy } from '../strat/interface/user.strat.interface'
import { UserContext } from '../user.context'

jest.mock('../strat/user.strat', () => ({
    AdminStrategy: jest.fn().mockImplementation(() => ({
        canCreate: jest.fn().mockReturnValue(true),
        canView: jest.fn().mockReturnValue(true),
        canEdit: jest.fn().mockReturnValue(true),
        canDelete: jest.fn().mockReturnValue(true),
    })),
    EditorStrategy: jest.fn().mockImplementation(() => ({
        canCreate: jest.fn().mockReturnValue(true),
        canView: jest.fn().mockReturnValue(true),
        canEdit: jest.fn().mockReturnValue(true),
        canDelete: jest.fn().mockReturnValue(false),
    })),
    ViewerStrategy: jest.fn().mockImplementation(() => ({
        canCreate: jest.fn().mockReturnValue(false),
        canView: jest.fn().mockReturnValue(true),
        canEdit: jest.fn().mockReturnValue(false),
        canDelete: jest.fn().mockReturnValue(false),
    })),
}))

describe('UserContext', () => {
    test('should use AdminStrategy for Admin role', () => {
        const userContext = new UserContext('Admin')
        const strategy = userContext['strategy'] as jest.Mocked<UserRoleStrategy>

        expect(strategy.canCreate()).toBe(true)
        expect(strategy.canView()).toBe(true)
        expect(strategy.canEdit()).toBe(true)
        expect(strategy.canDelete()).toBe(true)
    })

    test('should use EditorStrategy for Editor role', () => {
        const userContext = new UserContext('Editor')
        const strategy = userContext['strategy'] as jest.Mocked<UserRoleStrategy>

        expect(strategy.canCreate()).toBe(true)
        expect(strategy.canView()).toBe(true)
        expect(strategy.canEdit()).toBe(true)
        expect(strategy.canDelete()).toBe(false)
    })

    test('should use ViewerStrategy for Viewer role', () => {
        const userContext = new UserContext('Viewer')
        const strategy = userContext['strategy'] as jest.Mocked<UserRoleStrategy>

        expect(strategy.canCreate()).toBe(false)
        expect(strategy.canView()).toBe(true)
        expect(strategy.canEdit()).toBe(false)
        expect(strategy.canDelete()).toBe(false)
    })

    test('should throw an error for unknown role', () => {
        expect(() => new UserContext('UnknownRole')).toThrow('Unknown role')
    })
})
