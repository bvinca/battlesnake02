// eslint.config.js
import js from '@eslint/js';
import globals from 'globals';
import eslintCommentsPlugin from 'eslint-plugin-eslint-comments';
import unicornPlugin from 'eslint-plugin-unicorn';
import sonarPlugin from 'eslint-plugin-sonarjs';
import jestPlugin from 'eslint-plugin-jest';
import eslintConfigPrettier from 'eslint-config-prettier';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    ignores: ['docs/**'],
  },
  js.configs.recommended,

  {
    plugins: {
      'eslint-comments': eslintCommentsPlugin,
      unicorn: unicornPlugin,
      sonarjs: sonarPlugin,
    },

    rules: {
      ...eslintCommentsPlugin.configs.recommended.rules,
      ...unicornPlugin.configs.recommended.rules,
      ...sonarPlugin.configs.recommended.rules,
    },
  },

  eslintConfigPrettier,

  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'sonarjs/pseudo-random': 'off',
    },
  },
  {
    ...jestPlugin.configs['flat/recommended'],
    files: ['**/*.test.js'],
    rules: {
      ...jestPlugin.configs['flat/recommended'].rules,
      'jest/prefer-expect-assertions': 'off',
    },
  },
]);
