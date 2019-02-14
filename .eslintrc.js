module.exports = {
  root: true,
  extends: [
    'plugin:vue/recommended',
    'eslint:recommended',
    'plugin:prettier/recommended',
    'prettier/vue'
  ],
  "rules": {
    "quotes": [2, "single"],
    "prettier/prettier": ["error", { "singleQuote": true }]
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
};
