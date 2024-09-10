import typescriptEslint from '@typescript-eslint/eslint-plugin'
import prettier from 'eslint-plugin-prettier'
import globals from 'globals'
import tsParser from '@typescript-eslint/parser'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
})

export default [
    {
        ignores: ['*.js', '**/node_modules', '**/dist', '*.mjs'],
    },
    ...compat.extends(
        'airbnb-base',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ),
    {
        plugins: {
            '@typescript-eslint': typescriptEslint,
            prettier,
        },

        languageOptions: {
            globals: {
                ...globals.node,
                Atomics: 'readonly',
                SharedArrayBuffer: 'readonly',
            },

            parser: tsParser,
            ecmaVersion: 2018,
            sourceType: 'module',
        },

        settings: {
            'import/resolver': {
                typescript: {
                    project: './tsconfig.json',
                },
                node: {
                    extensions: ['.js', '.ts'],
                },
            },
        },

        rules: {
            'no-restricted-syntax': 'off',
            'no-underscore-dangle': 'off',
            'no-useless-constructor': 'off',
            'class-methods-use-this': 'off',
            'no-await-in-loop': 0,
            'no-use-before-define': 0,
            camelcase: 0,
            'dot-notation': 'off',
            'no-empty-function': [
                'error',
                {
                    allow: ['constructors'],
                },
            ],

            'import/no-extraneous-dependencies': [
                'error',
                {
                    devDependencies: true,
                    optionalDependencies: true,
                },
            ],

            'import/prefer-default-export': 'off',
            '@typescript-eslint/no-non-null-assertion': 'off',

            '@typescript-eslint/naming-convention': [
                'error',
                {
                    selector: 'interface',
                    format: ['PascalCase'],
                },
            ],

            'prettier/prettier': 'error',

            'import/extensions': [
                'error',
                'ignorePackages',
                {
                    ts: 'never',
                },
            ],

            'max-len': [
                'error',
                {
                    code: 100,
                    ignoreStrings: true,
                    ignoreTemplateLiterals: true,
                },
            ],

            'no-console': 'off',
            'no-param-reassign': [
                'error',
                {
                    props: false,
                },
            ],
            'func-names': 'off',
            'consistent-return': 'off',
            'max-classes-per-file': 'off',
            '@typescript-eslint/no-unsafe-function': 'off',

            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_$',
                    varsIgnorePattern: '^_$',
                },
            ],

            'no-prototype-builtins': 'off',
        },
    },
    {
        files: ['**/*.ts'],
        rules: {
            'import/no-extraneous-dependencies': ['off'],
        },
    },
    {
        files: ['src/**/*.test.ts', 'src/**/*.spec.ts'],
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
        },
    },
]
