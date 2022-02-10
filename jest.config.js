module.exports = {
  verbose: true,
  preset: "@vue/cli-plugin-unit-jest",
  setupFiles: ["./tests/unit.config.js"],
  transform: { "^.+\\.vue$": "vue-jest" },
  testMatch: ["**/tests/unit/**/*.test.js"],
};
