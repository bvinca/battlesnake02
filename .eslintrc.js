export default {
  extends: [
    "eslint:recommended",
    "plugin:sonarjs/recommended",
    "plugin:unicorn/recommended",
    "plugin:eslint-comments/recommended",
    "prettier",
  ],
  plugins: ["sonarjs", "unicorn", "eslint-comments"],
  rules: {
    "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "sonarjs/pseudo-random": "off",
  },
  env: {
    node: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
};
