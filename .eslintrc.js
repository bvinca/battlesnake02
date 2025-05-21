export default {
  extends: [
    "eslint:recommended",
    "plugin:sonarjs/recommended",
    "plugin:unicorn/recommended",
    "plugin:eslint-comments/recommended",
    "plugin:jest/recommended",
    "prettier",
  ],
  plugins: ["sonarjs", "unicorn", "eslint-comments", "jest"],
  rules: {
    "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "sonarjs/pseudo-random": "off",
  },
  env: {
    node: true,
    es2021: true,
    "jest/globals": true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
};
