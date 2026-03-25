module.exports = {
  ...require("@aleks-thunder/base/prettier"),
  overrides: [
    {
      files: "*.html",
      options: {
        parser: "angular",
      },
    },
  ],
};
