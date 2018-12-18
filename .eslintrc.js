module.exports = {
  root: true,
  parserOptions: {
    "parser": "babel-eslint",
    "ecmaVersion": 2017
  },
  env: {
    browser: true
  },
  extends: [
    'plugin:vue/recommended',
    'airbnb-base'
  ],
  plugins: [
    'vue'
  ],
  globals: {
    'PATH': true
  },
  rules: {
    'comma-dangle': 'off', //结尾使用额外的逗号
    'quote-props': 'off', //只对非法标识符的属性使用引号
    'vue/html-self-closing': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/first': 'off',
    'import/no-extraneous-dependencies': 'off',
    'max-len': 'off',
    'import/no-dynamic-require': 'off',
    'linebreak-style': 'off', //强制统一的换行符
    'no-tabs': 'off',
    'no-mixed-spaces-and-tabs': 'off',

    "indent": 'off', //缩进风格
    "quotes": 'off',
    "spaced-comment": 'off',
    'global-require': 'off', //全局的require
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-alert': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-console': 'off',
    'no-param-reassign': 'off',
    "prefer-promise-reject-errors": 'off',
    "no-mixed-operators": 'off',
    "vue/max-attributes-per-line": 'off', //每一行attributes的个数限制
    "vue/attribute-hyphenation": 'off', //template内attribute的风格'user-info' 还是'userInfo'
    "func-names": 'off',
    "vue/attributes-order": "off", //vue组件template属性的顺序
    "semi": 0, // 语句可以不需要分号结尾
    "no-redeclare": [2, { // 禁止重复声明变量
      "builtinGlobals": true
    }],
    "prefer-destructuring": 'off',
    "eol-last": 'off',
    "no-unused-expressions": [2, { // 禁止无用的表达式
      "allowShortCircuit": true,
      "allowTernary": true
    }],
  }
}