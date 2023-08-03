'use strict'

const path = require('node:path')

const {
  commonJsExtensions,
  esmExtensionsWhenTypeModule,
} = require('eslint-config-polioan/common/constants')

/** @type {import("eslint").Linter.Config} */
const config = {
  extends: [
    'polioan/configurations/comments',
    'polioan/configurations/general',
    'polioan/configurations/generalTypes',
    'polioan/configurations/regex',
    'polioan/configurations/spellcheck',
  ],
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  settings: {},
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    project: path.join(__dirname, 'tsconfig.json'),
  },
  plugins: [],
  rules: {
    'spellcheck/spell-checker': [
      'warn',
      {
        comments: true,
        strings: true,
        identifiers: true,
        templates: true,
        lang: 'en_US',
        skipWords: [
          'checkbox',
          'unary',
          'convertable',
          'baseexponent',
          'typeof',
          'str',
          'clipboardy',
          'esm',
          'cjs',
          'iife',
          'dts',
          'tsconfig',
          'minify',
          'rimraf',
        ],
      },
    ],
  },
  overrides: [
    {
      files: commonJsExtensions,
      extends: ['polioan/configurations/commonJS'],
    },
    {
      files: esmExtensionsWhenTypeModule,
      extends: ['polioan/configurations/esmModules'],
    },
    {
      files: ['examples/**'],
      rules: {
        'no-console': 'off',
      },
    },
    {
      files: ['.eslintrc.cjs'],
      rules: {
        'spellcheck/spell-checker': 'off',
      },
    },
  ],
}

module.exports = config
