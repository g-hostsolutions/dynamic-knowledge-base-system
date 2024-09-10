jest.mock('../../database/ormconfig', () => {
    return {
        AppDataSource: {
            initialize: jest.fn().mockResolvedValue(undefined),
            destroy: jest.fn().mockResolvedValue(undefined),
            isInitialized: false,
        },
    }
})
