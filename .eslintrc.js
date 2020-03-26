module.exports = {
  "env": {
    "commonjs": true,
    "es6": true,
    "node": true
  },
  "extends": ["eslint:recommended", "prettier"],
  "globals": {
    "describe": 'readonly',
    "test": 'readonly',
    "jest": 'readonly',
    "expect": 'readonly',
    "fetch": 'readonly',
    "navigator": 'readonly',
    "__DEV__": 'readonly',
    "XMLHttpRequest": 'readonly',
    "FormData": 'readonly',
    "React$Element": 'readonly',
    "before": 'readonly',
    "beforeEach": 'readonly',
    "by": 'readonly',
    "element": 'readonly',
    "it": 'readonly',
    "device": 'readonly',
    "after": 'readonly',
    "afterEach": 'readonly',
    "jasmine": 'readonly',
    "beforeAll": 'readonly',
    "afterAll": 'readonly',
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaVersion": 2018
  },
  "rules": {
    "semi": [2, 'never'],
    "quotes": [2, 'single', { "avoidEscape": true, "allowTemplateLiterals": true }],
    "no-constant-condition": ["error", { "checkLoops": false }],
    "require-atomic-updates": 0
  },
};
