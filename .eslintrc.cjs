module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    babelOptions: {
      presets: ['@babel/preset-react'],
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-no-target-blank': 'off',
    'no-unused-vars': ['warn', { varsIgnorePattern: 'React' }],
    'react/prop-types': 'off',
  },
};
