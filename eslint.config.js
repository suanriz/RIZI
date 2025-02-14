import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import pluginImport from 'eslint-plugin-import'
import tsParser from '@typescript-eslint/parser'
import vueParser from 'vue-eslint-parser'

export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  {
    ignores: [
      'src/types/*', 
      'node_modules/',
      'dist/'
    ],
  },
  {
    plugins: { import: pluginImport },
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        sourceType: 'module',
        ecmaVersion: 'latest'
      }
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { 'argsIgnorePattern': '_' }],
      'no-unused-vars': ['warn', { 'argsIgnorePattern': '_' }],
      'vue/multi-word-component-names': 'off',
      'vue/require-default-prop': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      'no-var': 'error',
      'prefer-const': 'error',
      'semi': [1, 'never'],
      'no-useless-escape': 0,
      'no-non-null-assertion': 0,
      'comma-spacing': 'error',
      'arrow-spacing': ['error', { 'before': true, 'after': true }],
      'no-multiple-empty-lines': 'error',
      'quotes': ['error', 'single'],
      'no-console': 'warn',
    },
  },
]
