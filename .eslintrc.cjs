module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:astro/recommended',
    'plugin:tailwindcss/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'astro', 'tailwindcss'],
  overrides: [
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      extends: ['plugin:astro/recommended'],
    },
  ],
  rules: {
    // Tailwind CSS specific rules
    'tailwindcss/no-custom-classname': 'off',
    'tailwindcss/css-order': 'off',
    'tailwindcss/no-undefined-in-class': 'off',
    // Astro specific rules
    'astro/no-script-leak': 'error',
    'astro/prefer-default-export': 'off',
    // TypeScript rules
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    // General rules
    'no-console': 'warn',
    'no-unused-vars': 'warn',
    'prefer-const': 'error',
  },
  ignorePatterns: ['dist/', 'node_modules/'],
};