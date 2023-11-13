module.exports = {
  plugins: ['@typescript-eslint', 'prettier', 'unused-imports'],
  extends: ['airbnb', 'airbnb-typescript', 'airbnb/hooks', 'next/core-web-vitals', 'prettier'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'no-magic-numbers': [
      'error',
      {
        ignore: [-1, 0, 1],
      },
    ],
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'enumMember',
        format: ['PascalCase'],
      },
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
    ],
    '@typescript-eslint/prefer-nullish-coalescing': 'error',
    'react/no-array-index-key': 'off',
    'react/no-unstable-nested-components': ['error', { allowAsProps: true }],
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.jsx', '.tsx', '.ts', '.js'],
      },
    ],
    'react/button-has-type': 'warn',
    'react/function-component-definition': 'off',
    'import/prefer-default-export': 'off',
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true}]
  },
};
