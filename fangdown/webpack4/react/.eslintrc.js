module.exports = {
  extends: [
      'eslint-config-alloy/react',
  ],
  globals: {
      // 这里填入你的项目需要的全局变量
      // 这里值为 false 表示这个全局变量不允许被重新赋值，比如：
      //
      // jQuery: false,
      // $: false
  },
  rules: {
      // 这里填入你的项目需要的个性化配置，比如：
      "max-len": [1, 120, 2, {ignoreComments: true}],
      'indent': [
          'error',
          2,
          {
              SwitchCase: 1,
              flatTernaryExpressions: true
          }
      ],
      "react/jsx-indent": 0,
      'react/jsx-indent-props': 0,
      'no-unused-expressions': 'off',
      'react/no-typos': 'off'
  }
};