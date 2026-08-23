# @nnry/eslint-config - Agent Guide

## Project Overview

This is an ESLint flat config package (`@nnry/eslint-config`) that provides reusable ESLint configurations for JavaScript/TypeScript projects. It's published to npm and uses ESLint's new flat config format.

## Commands

```bash
# Install dependencies
pnpm install

# Lint the config itself (using the config)
pnpm exec eslint src/

# Type-check
pnpm exec tsc --noEmit

# Publish (manual)
pnpm publish --access public --no-git-checks
```

**Note**: There is no `build` script. The package exports source files directly (`src/index.js` and `src/index.d.ts`). The CI workflow references a build step but it's commented out.

## Architecture & Exports

The package exports three config presets via `src/index.js`:

| Export | Description |
|--------|-------------|
| `base` | Core config: ESLint recommended + TypeScript recommended + custom JS/TS rules + stylistic rules |
| `browser` | `base` + browser globals |
| `stylistic` | Standalone stylistic rules (indentation, quotes, semicolons, etc.) |

Usage in consumer projects:
```js
// eslint.config.js
import nnrylint from '@nnry/eslint-config';

export default nnrylint.configs.base; // or .browser, .stylistic
```

## Key Patterns

### Config Structure
- Uses `defineConfig` from `eslint/config` for type-safe flat configs
- Rule categories are separated into constants (`stylisticRules`, `jsRules`, `tsRules`) with JSDoc typedefs for type inference
- TypeScript rules use `@typescript-eslint/*` prefix
- Stylistic rules use `@stylistic/*` prefix (requires `@stylistic/eslint-plugin` peer dep)

### TypeScript Config
Strict mode enabled with:
- `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`
- `verbatimModuleSyntax`, `isolatedModules`
- `strict: true`, `jsx: "react-jsx"`

### Dependencies
All dependencies are **peer dependencies** - consumers must install:
- `eslint@^10.0.0`
- `@eslint/js@^10.0.0`
- `typescript-eslint@^8.0.0`
- `@typescript-eslint/parser@^8.0.0`
- `@stylistic/eslint-plugin@^5.0.0`
- `globals@^17.0.0`

## Gotchas

1. **No build step** - Source files are published directly. Ensure `src/index.js` and `src/index.d.ts` stay in sync.

2. **Flat config only** - Does not support legacy `.eslintrc` format.

3. **Peer deps required** - The package won't work without consumers installing peer dependencies.

4. **ESM only** - `"type": "module"` in package.json. Consumer projects must use ESM or have `"type": "module"`.

5. **Version publishing** - CI publishes on git tags matching `v*` (e.g., `v1.0.0`). Uses npm OIDC (no token needed).

## File Structure

```
src/
├── index.js      # Main config exports (ESM)
└── index.d.ts    # TypeScript declarations
```

## CI/CD

- **Publish workflow**: `.github/workflows/publish.yml`
- Triggers on version tags (`v*`)
- Uses pnpm with corepack
- Requires `id-token: write` for npm OIDC publishing