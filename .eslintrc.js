module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/prettier",
  ],
  parserOptions: {
    ecmaVersion: 2020,
    parser: "babel-eslint",
  },
  overrides: [
    {
      files: ["**/tests/unit/**/*.test.js"],
      env: { jest: true },
    },
  ],
  ignorePatterns: [
    "configs.js",
    "utility.js",
    "enums.js",
  ],
};
