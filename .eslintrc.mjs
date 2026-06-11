import astro from 'eslint-plugin-astro';
import eslint from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import tailwindcss from 'eslint-plugin-tailwindcss';

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: tsparser
    },
    plugins: {
      astro
    },
    // We'll use the recommended rules from the astro plugin
    ...astro.configs.recommended,
  },
  {
    files: ['**/*.js', '**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsparser
    },
    plugins: {
      '@typescript-eslint': tseslint,
      tailwindcss
    },
    rules: {
      // Override any rules we want to change
      'tailwindcss/no-custom-classname': 'off',
      'tailwindcss/css-order': 'off',
      'tailwindcss/no-undefined-in-class': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'no-console': 'warn',
      'no-unused-vars': 'warn',
      'prefer-const': 'error'
    }
  },
  {
    ignores: ['dist/', 'node_modules/']
  }
];