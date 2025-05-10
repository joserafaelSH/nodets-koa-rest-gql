import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import {defineConfig} from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{ts}"],
    plugins: {js},
    extends: ["js/recommended"],
  },
  {
    files: ["**/*.{ts}"],
    languageOptions: {globals: globals.node},
  },
  tseslint.configs.recommended,
  {
    rules: {
      "no-unused-vars": "warn",
      //"no-undef": "warn",
      "no-unreachable": "warn",
      "no-duplicate-imports": "warn",
      "no-duplicate-case": "warn",
      "no-empty-character-class": "warn",
    },
  },
]);
