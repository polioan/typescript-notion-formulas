// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('node:path')

const project = path.join(__dirname, 'tsconfig.json')

/** @type {import("eslint").Linter.RulesRecord} */
const generalRules = {
  'no-self-compare': 'error',
  'no-unused-private-class-members': 'error',
  'no-constant-binary-expression': 'error',
  camelcase: ['error', { ignoreImports: false }],
  'default-case': 'error',
  'default-case-last': 'error',
  eqeqeq: 'warn',
  'func-name-matching': 'error',
  'logical-assignment-operators': 'error',
  'new-cap': 'error',
  'no-array-constructor': 'error',
  'no-caller': 'error',
  'no-console': 'error',
  'no-empty-function': 'off',
  'no-empty-static-block': 'error',
  'no-eval': 'error',
  'no-implied-eval': 'error',
  'no-new-func': 'error',
  'no-extend-native': 'error',
  'no-extra-bind': 'error',
  'no-extra-label': 'error',
  'no-label-var': 'error',
  'no-lonely-if': 'error',
  'no-multi-assign': 'error',
  'no-new-wrappers': 'error',
  'no-proto': 'error',
  'no-return-assign': 'error',
  'no-throw-literal': 'error',
  'no-unneeded-ternary': 'error',
  'no-useless-computed-key': 'error',
  'no-useless-constructor': 'off',
  'no-useless-return': 'error',
  'operator-assignment': 'error',
  'prefer-const': 'warn',
  'prefer-exponentiation-operator': 'error',
  'prefer-object-spread': 'error',
  'prefer-regex-literals': 'error',
  'prefer-spread': 'error',
  'require-await': 'warn',
  'symbol-description': 'warn',
  'no-inner-declarations': 'off',
  'no-unused-expressions': 'error',
}

/** @type {import("eslint").Linter.RulesRecord} */
const generalRulesForTypeScript = {
  '@typescript-eslint/consistent-type-imports': [
    'error',
    {
      prefer: 'type-imports',
      fixStyle: 'separate-type-imports',
    },
  ],
  '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  '@typescript-eslint/array-type': ['error', { default: 'array' }],
  '@typescript-eslint/ban-ts-comment': 'off',
  '@typescript-eslint/consistent-generic-constructors': [
    'error',
    'constructor',
  ],
  '@typescript-eslint/consistent-indexed-object-style': ['warn', 'record'],
  '@typescript-eslint/method-signature-style': ['error', 'property'],
  '@typescript-eslint/no-duplicate-enum-values': 'error',
  '@typescript-eslint/no-duplicate-type-constituents': 'error',
  '@typescript-eslint/no-dynamic-delete': 'warn',
  '@typescript-eslint/no-import-type-side-effects': 'error',
  '@typescript-eslint/no-meaningless-void-operator': 'warn',
  '@typescript-eslint/no-redundant-type-constituents': 'warn',
  '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
  '@typescript-eslint/no-unnecessary-condition': 'warn',
  '@typescript-eslint/no-unnecessary-qualifier': 'error',
  '@typescript-eslint/no-unnecessary-type-arguments': 'error',
  '@typescript-eslint/no-unsafe-declaration-merging': 'error',
  '@typescript-eslint/no-unsafe-enum-comparison': 'error',
  '@typescript-eslint/prefer-function-type': 'error',
  '@typescript-eslint/prefer-optional-chain': 'error',
  '@typescript-eslint/prefer-ts-expect-error': 'error',
  '@typescript-eslint/require-array-sort-compare': 'warn',
  '@typescript-eslint/switch-exhaustiveness-check': 'warn',
  '@typescript-eslint/unified-signatures': 'warn',
  '@typescript-eslint/naming-convention': [
    'error',
    {
      selector: 'interface',
      format: ['PascalCase'],
    },
    {
      selector: 'typeLike',
      format: ['PascalCase'],
    },
  ],
  '@typescript-eslint/no-namespace': 'off',
  '@typescript-eslint/explicit-member-accessibility': [
    'error',
    { overrides: { constructors: 'no-public' } },
  ],
}

/** @type {import("eslint").Linter.RulesRecord} */
const typeCheckingRules = {
  '@typescript-eslint/no-unsafe-argument': 'warn',
  '@typescript-eslint/no-unsafe-assignment': 'warn',
  '@typescript-eslint/no-unsafe-return': 'warn',
  '@typescript-eslint/no-unsafe-member-access': 'warn',
  '@typescript-eslint/no-unsafe-call': 'warn',
  '@typescript-eslint/unbound-method': 'warn',
  '@typescript-eslint/restrict-template-expressions': 'warn',
}

/** @type {import("eslint").Linter.RulesRecord} */
const unicornRules = {
  'unicorn/better-regex': 'error',
  'unicorn/custom-error-definition': 'error',
  'unicorn/error-message': 'error',
  'unicorn/filename-case': [
    'error',
    {
      case: 'camelCase',
    },
  ],
  'unicorn/new-for-builtins': 'error',
  'unicorn/no-array-method-this-argument': 'error',
  'unicorn/no-array-push-push': 'error',
  'unicorn/no-empty-file': 'error',
  'unicorn/no-instanceof-array': 'error',
  'unicorn/no-unnecessary-await': 'warn',
  'unicorn/no-useless-fallback-in-spread': 'warn',
  'unicorn/no-useless-length-check': 'warn',
  'unicorn/no-useless-spread': 'warn',
  'unicorn/no-useless-switch-case': 'warn',
  'unicorn/no-useless-undefined': 'warn',
  'unicorn/no-zero-fractions': 'error',
  'unicorn/number-literal-case': 'error',
  'unicorn/prefer-array-flat-map': 'warn',
  'unicorn/prefer-math-trunc': 'warn',
  'unicorn/prefer-modern-math-apis': 'error',
  'unicorn/prefer-negative-index': 'warn',
  'unicorn/prefer-node-protocol': 'error',
  'unicorn/prefer-optional-catch-binding': 'error',
  'unicorn/prefer-switch': 'warn',
  'unicorn/throw-new-error': 'error',
}

/** @type {import("eslint").Linter.RulesRecord} */
const spellRules = {
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
}

/** @type {import("eslint").Linter.RulesRecord} */
const jsdocRules = {
  'jsdoc/check-alignment': 'error',
  'jsdoc/check-indentation': 'error',
  'jsdoc/check-tag-names': 'error',
  'jsdoc/match-description': [
    'error',
    { matchDescription: '^\n?([A-Z`\\d_][\\s\\S]*\\.)\\s*$' },
  ],
  'jsdoc/no-bad-blocks': ['error', { preventAllMultiAsteriskBlocks: true }],
  'jsdoc/no-blank-block-descriptions': 'error',
  'jsdoc/no-blank-blocks': 'error',
  'jsdoc/no-multi-asterisks': 'error',
  'jsdoc/require-asterisk-prefix': 'error',
  'jsdoc/require-hyphen-before-param-description': 'warn',
  'jsdoc/require-param-description': 'error',
  'jsdoc/require-param-name': 'error',
  'jsdoc/require-throws': 'error',
  'jsdoc/require-jsdoc': 'off',
}

/** @type {import("eslint").Linter.RulesRecord} */
const securityRules = {
  'security/detect-object-injection': 'warn',
}

const plugins = [
  '@typescript-eslint',
  'unicorn',
  'spellcheck',
  'jsdoc',
  'security',
]

const extendsFrom = [
  'eslint:recommended',
  'plugin:@typescript-eslint/recommended',
]

/** @type {import("eslint").Linter.Config} */
const config = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  overrides: [
    {
      extends: [
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      files: ['*.ts'],
      parserOptions: {
        project,
      },
      rules: typeCheckingRules,
    },
    {
      files: ['test/**'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/unbound-method': 'off',
        'security/detect-object-injection': 'off',
      },
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
  parser: '@typescript-eslint/parser',
  root: true,
  parserOptions: {
    project,
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {},
  plugins,
  extends: extendsFrom,
  rules: {
    ...generalRules,
    ...generalRulesForTypeScript,
    ...unicornRules,
    ...spellRules,
    ...jsdocRules,
    ...securityRules,
  },
}

module.exports = config
