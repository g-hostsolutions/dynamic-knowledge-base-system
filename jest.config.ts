import type { Config } from 'jest'

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/src/**/*.test.ts', '**/src/**/*.spec.ts'],
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    collectCoverage: true,
    coverageDirectory: '<rootDir>/coverage',
    coverageReporters: ['json', 'lcov', 'text', 'clover'],
}

export default config
