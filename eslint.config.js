import sveltePlugin from "eslint-plugin-svelte";
import svelteParser from "svelte-eslint-parser";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import importPlugin from "eslint-plugin-import"; // Import the import plugin

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  // Svelte configuration
  {
    files: ["**/*.svelte"],
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        parser: tsParser,
        project: "./tsconfig.json",
        extraFileExtensions: [".svelte"],
        tsconfigRootDir: process.cwd(),
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      svelte: sveltePlugin,
      "@typescript-eslint": tsPlugin,
      import: importPlugin,
    },
    rules: {
      ...sveltePlugin.configs.recommended.rules,
      ...tsPlugin.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }
      ],
      // Additional Rules
      "indent": ["error", 2],
      "quotes": ["error", "single", { "avoidEscape": true }],
      "semi": ["error", "always"],
      "max-len": ["warn", { "code": 100 }],
      "no-console": ["warn", { "allow": ["warn", "error"] }],
      "consistent-return": "error",
      "no-unused-expressions": "error",
      "prefer-arrow-callback": "error",
      "import/order": ["error", { "groups": ["builtin", "external", "internal"] }],
      "@typescript-eslint/explicit-function-return-type": ["warn"],
    },
  },
  // TypeScript configuration
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: process.cwd(),
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      import: importPlugin, // Add the import plugin
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }
      ],
      // Additional Rules
      "indent": ["error", 2],
      "quotes": ["error", "single", { "avoidEscape": true }],
      "semi": ["error", "always"],
      "max-len": ["warn", { "code": 100 }],
      "no-console": ["warn", { "allow": ["warn", "error"] }],
      "consistent-return": "error",
      "no-unused-expressions": "error",
      "prefer-arrow-callback": "error",
      "import/order": ["error", { "groups": ["builtin", "external", "internal"] }],
      "@typescript-eslint/explicit-function-return-type": ["warn"],
    },
  },
  // Ignore patterns
  {
    ignores: ["node_modules", ".svelte-kit", "build", "public", "dist"],
  },
];
