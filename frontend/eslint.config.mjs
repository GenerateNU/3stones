import globals from 'globals'
import jsEslint from '@eslint/js'
import typescriptEslint from 'typescript-eslint'
import eslintPluginReact from 'eslint-plugin-react'
import eslintConfigPrettier from 'eslint-config-prettier'

export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { ignores: ['.eslintrc.js', '.prettierrc.json', 'babel.config.js', '**/node_modules/', '.git/'] },
  { languageOptions: { globals: globals.browser } },
  jsEslint.configs.recommended,
  ...typescriptEslint.configs.recommended,
  eslintPluginReact.configs.flat.recommended,
  eslintConfigPrettier,
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
      'no-unneeded-ternary': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-exponentiation-operator': 'warn',
      'require-await': 'error',
      'react/prop-types': 'off',
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
]
