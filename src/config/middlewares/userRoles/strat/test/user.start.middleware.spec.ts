import { AdminStrategy, EditorStrategy, ViewerStrategy } from '../user.strat'

describe('UserRoleStrategy', () => {
    describe('AdminStrategy', () => {
        let strategy: AdminStrategy

        beforeEach(() => {
            strategy = new AdminStrategy()
        })

        test('should allow create', () => {
            expect(strategy.canCreate()).toBe(true)
        })

        test('should allow view', () => {
            expect(strategy.canView()).toBe(true)
        })

        test('should allow edit', () => {
            expect(strategy.canEdit()).toBe(true)
        })

        test('should allow delete', () => {
            expect(strategy.canDelete()).toBe(true)
        })
    })

    describe('EditorStrategy', () => {
        let strategy: EditorStrategy

        beforeEach(() => {
            strategy = new EditorStrategy()
        })

        test('should not allow create', () => {
            expect(strategy.canCreate()).toBe(false)
        })

        test('should allow view', () => {
            expect(strategy.canView()).toBe(true)
        })

        test('should allow edit', () => {
            expect(strategy.canEdit()).toBe(true)
        })

        test('should not allow delete', () => {
            expect(strategy.canDelete()).toBe(false)
        })
    })

    describe('ViewerStrategy', () => {
        let strategy: ViewerStrategy

        beforeEach(() => {
            strategy = new ViewerStrategy()
        })

        test('should not allow create', () => {
            expect(strategy.canCreate()).toBe(false)
        })

        test('should allow view', () => {
            expect(strategy.canView()).toBe(true)
        })

        test('should not allow edit', () => {
            expect(strategy.canEdit()).toBe(false)
        })

        test('should not allow delete', () => {
            expect(strategy.canDelete()).toBe(false)
        })
    })
})
