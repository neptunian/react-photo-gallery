module.exports = {
  extends: ['prettier', 'prettier/react'],
  plugins: ['react', 'prettier', 'react-hooks'],
  parser: 'babel-eslint',
  env: {
    es6: true,
    node: true,
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        printWidth: 120,
        tabWidth: 2,
        singleQuote: true,
        trailingComma: 'es5',
        bracketSpacing: true,
      },
    ],
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
  },
};
