module.exports = {
  env: {
    es2021: true,
    node: true,
  },

  extends: 'airbnb-base',

  overrides: [
    {
      env: {
        node: true,
      },

      files: ['.eslintrc.{js,cjs}'],

      parserOptions: {
        sourceType: 'script',
      },
    },
  ],

  parserOptions: {
    ecmaVersion: 'latest',

    sourceType: 'module',
  },

  rules: {
    'comma-dangle': ['error", "always-multiline'],

    quotes: ['error', 'single'],

    semi: ['error ', 'always'],
  },

  settings: {
    'import/extensions': ['.js'],
  },
};
