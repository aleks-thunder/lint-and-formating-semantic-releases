# Lint/Format preset R&D (semantic-release)

## Why a dummy repo / flow

Before publishing real shared presets, we need to validate the end-to-end release pipeline:

1. Make a commit with conventional commit messages (e.g. `feat(...)`, `fix(...)`, `feat()!`, `breaking(...)`, or `feat: ...` with a footer `BREAKING CHANGE: ...` after a blank line — not `BREAKING CHANGE:` as the only line; see [rnd-semantic-release.md](./rnd-semantic-release.md)).
2. Open a PR and merge it to `main`.
3. `semantic-release` runs in CI and (a) creates a GitHub Release and (b) publishes packages to GitHub Packages.
4. Create a second consumer repo and install the published package(s) as dependencies.

This dummy repo proves that:
- release automation works (versioning + Git tags + GitHub Release creation),
- package publishing works (GitHub Packages registry),
- consumers can install and use the presets.

## Core R&D questions

### 1) `peerDependencies` vs `dependencies` for `eslint` and `prettier`

**Goal:** reduce consumer setup steps while keeping installs predictable.

- `peerDependencies`
  - Benefit: avoids duplicate ESLint/Prettier installations and reduces “two versions installed” problems.
  - Cost: the consumer must explicitly install `eslint` and `prettier` (more actions).
- `dependencies`
  - Benefit: consumer installs fewer direct packages because tooling is brought transitively.
  - Cost: consumers can end up with multiple ESLint/Prettier versions if they already depend on different versions.

**Decision for this project:** use `dependencies` in the shared preset packages to make the consumer onboarding minimal.

### 2) `eslint.js` (module export) vs `.eslintrc.*` (config file)

- `eslint.js` (JS module)
  - Benefit: the package exposes a stable import target, and it aligns well with `package.json` `exports`.
  - Benefit: consumers can reliably extend the preset by referencing your exported module.
- `.eslintrc.*` inside the published package
  - Cost: config-file discovery and resolution can be brittle once published (path expectations, legacy vs modern config loading).

**Decision for this project:** ship JS presets (`eslint.js`, `prettier.js`) and expose them via `package.json` `exports`.

### 3) `file:` links vs real semver dependencies after publishing

- `file:` links
  - Work locally in a monorepo for fast iteration.
  - Do **not** translate well after publishing because `file:../base` points to a path that doesn’t exist in the consumer environment.
- Real dependency ranges
  - Ensure that when `@aleks-thunder/angular` (or `@aleks-thunder/react`) is installed, `@aleks-thunder/base` is also installed from the registry.

**Decision for this project:** `@aleks-thunder/angular` and `@aleks-thunder/react` depend on `@aleks-thunder/base` using a portable range (for demo simplicity: `"*"`).

#### Additional R&D: local development without release

**Goal:** test `base -> angular/react -> consumer` changes locally before publishing.

**Recommended workflow (tested):**

1. In consumer `package.json`, set preset package to local path:
   - `@aleks-thunder/angular`: `file:../../Lint-and-formating-semantic-releases/packages/angular`
   - `@aleks-thunder/react`: `file:../../Lint-and-formating-semantic-releases/packages/react`
2. Add override for base:
   - `"overrides": { "@aleks-thunder/base": "file:../../Lint-and-formating-semantic-releases/packages/base" }`
3. Run `npm install` in consumer.
4. Edit preset files locally in this repo and re-run:
   - `npm install` (consumer) + `npx eslint ...` / app lint command.

**Why this works:** consumer loads local preset package(s), and their `@aleks-thunder/base` dependency resolves to local `packages/base` via `overrides`.

**Trade-offs:**
- Fast local iteration, no release needed.
- `file:` paths are local-dev only; keep CI/release flows on registry versions.
- If changes seem stale (due to ESLint cache), run `npm i --force` in consumer and restart editor `Developer: Reload Window`.

## Final chosen strategy (applies to this repository)

### Preset packages and exports

- `@aleks-thunder/base`
  - Exposes `eslint.js` and `prettier.js` via `packages/base/package.json` `exports`.
- `@aleks-thunder/angular` and `@aleks-thunder/react`
  - Expose their own `eslint.js` and `prettier.js` (and extend `@aleks-thunder/base` presets).

### Dependency model

- `@aleks-thunder/base`:
  - uses `dependencies` for `eslint` and `prettier`.
- `@aleks-thunder/angular` and `@aleks-thunder/react`:
  - depend on `@aleks-thunder/base` with a portable semver range (demo: `"*"`).
  - do not require the consumer to separately install `eslint/prettier`.

## Expected consumer usage after implementation

- Install only the preset package:
  - `npm i -D @aleks-thunder/angular`
  - (or `.../react` / `.../base`)
- ESLint config:
  - flat config: `import` from `@aleks-thunder/angular/eslint` (see [consumer.md](./consumer.md)).
- Prettier config:
  - `import` from `@aleks-thunder/angular/prettier` (see [consumer.md](./consumer.md)).

