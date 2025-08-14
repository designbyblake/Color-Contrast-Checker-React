import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import jsxA11y from 'eslint-plugin-jsx-ally'
import json from 'eslint-plugin-json';
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import eslintConfigPrettier from "eslint-config-prettier/flat";
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import { globalIgnores } from 'eslint/config'

export default tseslint.config([
    globalIgnores(['dist']),
    {
        files: ['**/*.{ts,tsx}'],
        plugins: {
            'jsx-a11y': jsxA11y,
            'simple-import-sort': simpleImportSort,
            '@typescript-eslint': typescriptEslint,
        },
        extends: [
            js.configs.recommended,
            tseslint.configs.recommended,
            reactHooks.configs['recommended-latest'],
            reactRefresh.configs.vite,
        ],
        rules: {
            'simple-import-sort/imports': 'error',
            'simple-import-sort/exports': 'error',
            'no-unused-vars': 'error',
        },
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
    }, {
        files: ["**/*.json"],
        ...json.configs["recommended"],
        rules: {
            "json/*": ["error", { "allowComments": true }]
        },
    },
    js.configs.recommended,
    ...tseslint.configs.recommended
    , eslintConfigPrettier])
