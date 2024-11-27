import sveltePlugin from 'eslint-plugin-svelte';
import svelteParser from 'svelte-eslint-parser';
import typescriptParser from '@typescript-eslint/parser';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        parser: typescriptParser,
        project: './tsconfig.json',
        extraFileExtensions: ['.svelte'],
        tsconfigRootDir: process.cwd(),
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      svelte: sveltePlugin,
      '@typescript-eslint': typescriptPlugin,
    },
    rules: {
      ...sveltePlugin.configs.recommended.rules,
      ...typescriptPlugin.configs.recommended.rules,
    },
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: process.cwd(),
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
    },
    rules: {
      ...typescriptPlugin.configs.recommended.rules,
    },
  },
  {
    ignores: ['node_modules', '.svelte-kit', 'build', 'public', 'dist'],
  },
];
