import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    ignorePatterns: ['node_modules', 'dist', 'build'],
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: { js },
    extends: ['@rocketseat/eslint-config/node'],
    languageOptions: { globals: globals.node },
    rules: {
      'new-line-per-chained-call': ['error', { ignoreChainWithDepth: 1 }],
    },
  },
  tseslint.configs.recommended,
]);
