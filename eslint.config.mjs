import js from '@eslint/js';
import astro from 'eslint-plugin-astro';
import tsPlugin from '@typescript-eslint/eslint-plugin';

export default [
  {
    ignores: ['dist/**', 'node_modules/**', '.astro/**'],
  },
  js.configs.recommended,
  ...tsPlugin.configs['flat/recommended'],
  ...astro.configs['flat/recommended'],
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx,astro}'],
    rules: {
      'no-console': 'warn',
      'prefer-const': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
];