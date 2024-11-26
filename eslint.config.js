// eslint.config.js
import globals from "globals";
import js from "@eslint/js";
import sveltePlugin from "eslint-plugin-svelte";
import svelteParser from "svelte-eslint-parser";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  // Ignore Patterns
  {
    ignores: [
      "**/node_modules/**",
      "**/.svelte-kit/**",
      "**/dist/**",
      "**/build/**",
      "**/coverage/**",
    ],
  },

  // JavaScript Configuration
  {
    files: ["**/*.js"],
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      ...js.configs.recommended.rules,
    },
  },

  // Svelte Configuration
  {
    files: ["**/*.svelte"],
    languageOptions: {
      parser: svelteParser,
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      svelte: sveltePlugin,
    },
    processor: sveltePlugin.processors.svelte,
    rules: {
      ...sveltePlugin.configs.recommended.rules,
    },
  },
];
