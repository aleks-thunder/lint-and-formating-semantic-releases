module.exports = {
  extends: [require.resolve("@aleks-thunder/base/eslint")],
  parserOptions: {
    project: false,
  },
  ignorePatterns: ["dist", "build"],
};
