import globals from "globals";
import js from "@eslint/js";
import sveltePlugin from "eslint-plugin-svelte";
import svelteParser from "svelte-eslint-parser";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  // JavaScript and TypeScript configuration
  {
    files: ["**/*.js", "**/*.ts"],
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      ...js.configs.recommended.rules,
    },
  },
  // Svelte configuration
  {
    files: ["**/*.svelte"],
    plugins: {
      svelte: sveltePlugin,
    },
    languageOptions: {
      parser: svelteParser,
      // Add any additional parser options if necessary
    },
    rules: {
      ...sveltePlugin.configs.recommended.rules,
    },
  },
];
