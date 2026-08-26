// @ts-check
import pluginJs from '@eslint/js';
import stylisticEslint from '@stylistic/eslint-plugin';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
/**
 * @typedef {import('@stylistic/eslint-plugin/rule-options').RuleOptions} _StylisticRuleOptions
 * @typedef {{ [K in keyof _StylisticRuleOptions]: ['error' | 'warn' | 'off', ..._StylisticRuleOptions[K]] }} StylisticRuleOptions
 * @typedef {import('eslint').Linter.RulesRecord} JSRules
 * @typedef {import('eslint').Linter.RulesRecord} TSRules
 */

/** @type {Partial<StylisticRuleOptions>} */
const stylisticRules = {
  '@stylistic/semi': ['error', 'always', { omitLastInOneLineBlock: true }],
  '@stylistic/comma-dangle': ['error', 'always-multiline'],
  '@stylistic/quotes': ['error', 'single'],
  '@stylistic/no-multiple-empty-lines': ['error'],
  '@stylistic/indent': ['error', 2],
};
/** @type {JSRules} */
const jsRules = {
  'no-empty': ['error'],
  'no-empty-function': ['error'],
};

/** @type {Partial<TSRules>} */
const tsRules = {
  '@typescript-eslint/no-unused-vars': [
    'error',
    {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
      caughtErrorsIgnorePattern: '^_',
      ignoreRestSiblings: true,
    },
  ],
};

/** @type {import('eslint').Linter.Config[]} */
export const stylistic = [
  {
    plugins: {
      '@stylistic': stylisticEslint,
    },
    rules: stylisticRules,
  },
];

/** @type {import('eslint').Linter.Config[]} */
export const base = defineConfig([
  {
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...jsRules,
      ...tsRules,
    },
  },
  ...tseslint.configs.recommended,
  ...stylistic,
]);

export const browser = defineConfig([
  {
    languageOptions: { globals: globals.browser },
  },
  ...base,
]);

/** @type {{ base: import('eslint').Linter.Config[], browser: import('eslint').Linter.Config[], stylistic: import('eslint').Linter.Config[] }} */
export const configs = {
  base,
  browser,
  stylistic,
};

/** @type {{ configs: typeof configs }} */
export const nnrylint = {
  configs,
};

export default nnrylint;
