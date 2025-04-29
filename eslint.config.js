// eslint.config.js
import js from "@eslint/js";
import globals from "globals";
import eslintCommentsPlugin from "eslint-plugin-eslint-comments";
import unicornPlugin from "eslint-plugin-unicorn";
import sonarPlugin from "eslint-plugin-sonarjs";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import { defineConfig } from "eslint/config";

export default defineConfig([

  js.configs.recommended,

  {
    plugins: {
      "eslint-comments": eslintCommentsPlugin,
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
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      semi: ["error", "always"],
      quotes: ["error", "single"],
    },
  },
]);
