/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: ['plugin:vue/vue3-recommended', 'eslint:recommended', '@vue/eslint-config-typescript'],
  ignorePatterns: [
    '/coverage/*',
    '/dist/*',
    '/dist-ssr/*',
    '/stats/*',
    '/index.html', // Don't lint third party snippets placed in index
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
}
