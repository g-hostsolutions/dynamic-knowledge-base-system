import { jest } from '@jest/globals'

export const mockRouteFactory = {
    applyRoutes: jest.fn(),
}

export default {
    RouteFactory: jest.fn().mockImplementation(() => mockRouteFactory),
}
