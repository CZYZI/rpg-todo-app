import { defineConfig } from 'eslint';
import js from '@eslint/js';
import typescriptEslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

export default defineConfig([
  {
    ignores: ['dist', 'build', 'node_modules'],
  },
  {
    ...js.configs.recommended,
    files: ['**/*.{js,ts,jsx,tsx}'],
  },
  ...typescriptEslint.configs.recommended,
  {
    ...reactHooks.configs.recommended,
    files: ['**/*.{js,ts,jsx,tsx}'],
  },
  {
    plugins: {
      'react-refresh': reactRefresh,
    },
    files: ['**/*.{js,ts,jsx,tsx}'],
    rules: {
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
  {
    files: ['**/*.{js,ts,jsx,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  },
]);
