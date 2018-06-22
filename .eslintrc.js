module.exports = {
  extends: [
    'prettier',
    'prettier/react'
  ],
  plugins: [
    'react',
    'prettier'
  ],
  parser: 'babel-eslint',
  env: {
    es6: true,
    node: true,
  },
  rules: {
    'prettier/prettier': ['error', {
      printWidth: 120,
      tabWidth: 2,
      singleQuote: true,
      trailingComma: 'es5',
      bracketSpacing: true,
    }],
  }
};
