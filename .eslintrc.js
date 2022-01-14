module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
    'prettier',
    'plugin:storybook/recommended',
  ],
  ignorePatterns: ['.eslintrc.js', 'prettier.config.js', 'postcss.config.js', 'tailwind.config.js'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn',
    // Checks effect dependencies
    'no-case-declarations': 'off',
  },
  env: {
    browser: true,
  },
};
