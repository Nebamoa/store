import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginPrettier from "eslint-plugin-prettier"; // ✅ импорт плагина Prettier
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: {
      js,
      prettier: pluginPrettier,
    },
    extends: ["js/recommended"],
    rules: {
      "prettier/prettier": "warn",
    },
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    languageOptions: {
      globals: globals.browser,
    },
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    name: "Disable formatting rules from ESLint for Prettier compatibility",
    rules: {
      "arrow-body-style": "off",
      "prefer-arrow-callback": "off",
    },
  },
]);
