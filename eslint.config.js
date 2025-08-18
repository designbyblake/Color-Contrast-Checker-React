import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import { globalIgnores } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import json from 'eslint-plugin-json';
import jsxA11y from 'eslint-plugin-jsx-ally';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';
export default tseslint.config([
    globalIgnores(['dist']),
    {
        files: ['**/*.{ts,tsx,js,jsx}'],
        plugins: {
            'jsx-a11y': jsxA11y,
            'simple-import-sort': simpleImportSort,
            '@typescript-eslint': typescriptEslint,
            '@stylistic': stylistic
        },
        extends: [
            js.configs.recommended,
            tseslint.configs.recommended,
            stylistic.configs.recommended,
            reactHooks.configs['recommended-latest'],
            reactRefresh.configs.vite,
        ],
        rules: {
            'simple-import-sort/imports': 'error',
            'simple-import-sort/exports': 'error',
            'no-unused-vars': 'error',
            'no-multiple-empty-lines': ['error', { max: 2 }],
            '@stylistic/no-multiple-empty-lines': ['error', { max: 2 }]
        },
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser
        }
    },
    {
        files: ['**/*.json'],
        ...json.configs['recommended'],
        rules: {
            'json/*': ['error', { allowComments: true }]
        }
    },
    ...tseslint.configs.recommended
]).concat(eslintConfigPrettier);
