# Shared lint/format configs with semantic-release

This repository publishes reusable lint and formatting presets as scoped packages for consumer applications.

## Packages

- `@aleks-thunder/base`
- `@aleks-thunder/angular`
- `@aleks-thunder/react`

## How release automation works

- Commits on `main` follow Conventional Commits.
- GitHub Actions runs `semantic-release` per package.
- Package version/tag/release are created automatically.
- Package is published to GitHub Packages (`npm.pkg.github.com`).

## Consumer usage

Install package:

```bash
npm i -D @aleks-thunder/base
```

ESLint (`.eslintrc.cjs`):

```js
module.exports = {
  extends: ["@aleks-thunder/base/eslint"],
};
```

Prettier (`prettier.config.cjs`):

```js
module.exports = require("@aleks-thunder/base/prettier");
```
