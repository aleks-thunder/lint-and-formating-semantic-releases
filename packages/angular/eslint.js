const baseConfig = require("@aleks-thunder/base/eslint");
const angular = require("angular-eslint");
const prettierPlugin = require("eslint-plugin-prettier");

module.exports = [
  baseConfig,
  ...angular.configs.tsRecommended,
  ...angular.configs.templateRecommended,
  {
    files: ["**/*.ts"],
    processor: angular.processInlineTemplates,
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],
      "@typescript-eslint/member-ordering": [
        "error",
        {
          default: [
            "public-decorated-field",
            "protected-decorated-field",
            "private-decorated-field",
            "public-instance-field",
            "public-static-field",
            "protected-instance-field",
            "private-instance-field",
            "constructor",
            "public-instance-method",
            "public-static-method",
            "protected-instance-method",
            "private-instance-method",
          ],
        },
      ],
    },
  },
  {
    files: ["**/*.html"],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": ["error", { parser: "angular" }],
      "@angular-eslint/template/attributes-order": [
        "error",
        {
          order: [
            "STRUCTURAL_DIRECTIVE",
            "TEMPLATE_REFERENCE",
            "ATTRIBUTE_BINDING",
            "INPUT_BINDING",
            "TWO_WAY_BINDING",
            "OUTPUT_BINDING",
          ],
          alphabetical: false,
        },
      ],
    },
  },
];
