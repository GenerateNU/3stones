import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'

export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser, parser: '@typescript-eslint/parser' } },
  {
    rules: {
      'no-duplicate-imports': 'error',
      'no-self-compare': 'error',
      'no-unmodified-loop-condition': 'error',
      'no-unreachable-loop': 'error',
      'no-use-before-define': 'error',
      'no-useless-assignment': 'error',
      camelcase: 'error',
      'class-methods-use-this': 'error',
      curly: 'error',
      'default-case': 'error',
      'default-case-last': 'error',
      eqeqeq: 'error',
      'no-else-return': 'error',
      'no-magic-numbers': 'error',
      'no-unneeded-ternary': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-destructuring': 'warn',
      'prefer-exponentiation-operator': 'warn',
      'require-await': 'error',
    },
  },
  { ignores: ['.eslintrc.js', '.prettierrc.json', 'babel.config.js', '**/node_modules/', '.git/'] },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
]
