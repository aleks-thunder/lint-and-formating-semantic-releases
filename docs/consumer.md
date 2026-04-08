# Consumer usage

Install package:

```bash
npm i -D @aleks-thunder/base
# or: @aleks-thunder/angular | @aleks-thunder/react
```

Add at the project root:

- **`eslint.config.js`** — flat ESLint config (use **`eslint.config.mjs`** if you want ESM without `"type": "module"` in `package.json`).
- **`prettier.config.js`** — Prettier config (same for **`prettier.config.mjs`** or `.prettierrc.json` if you prefer JSON).

**`eslint.config.js`**

```js
import baseEslint from "@aleks-thunder/base/eslint";
// import angularEslint from "@aleks-thunder/angular/eslint";

export default baseEslint;
```

**`prettier.config.js`**

```js
import basePrettier from "@aleks-thunder/base/prettier";
// import angularPrettier from "@aleks-thunder/angular/prettier";

export default basePrettier;
```
