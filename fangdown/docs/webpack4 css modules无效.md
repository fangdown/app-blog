### 抽取css失效了？

在webpack4中生产模式中要对公共css进行抽取成独立文件，
配置如下

```javascript
const getUseLessModules = () => {
  return [
    {
      loader: require.resolve('css-loader'),
      options: {
        importLoaders: 1,
        modules: true,
        outside: true,
        // localIdentName: '[path]___[name]__[local]___[hash:base64:5]',
        localIdentName: '[name]__[local]___[hash:base64:5]',
      },
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        // Necessary for external CSS imports to work
        // https://github.com/facebookincubator/create-react-app/issues/2677
        ident: 'postcss',
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          autoprefixer({
            browsers: [
              '>1%',
              'last 4 versions',
              'Firefox ESR',
              'not ie < 9', // React doesn't support IE8 anyway
            ],
            flexbox: 'no-2009',
          }),
        ],
      },
    },
    {
      loader: 'less-loader',
      options: {
        // modifyVars: theme,
      },
    },
  ];
};

// module中配置
  {
      test: /(\.less|\.css)$/,
      include: [
        path.resolve(paths.appSrc, 'main/'),
        path.resolve(paths.appSrc, 'modules/'),
      ],
      use: [
        // "style" loader turns CSS into JS modules that inject <style> tags.
        require.resolve('style-loader'),
        //  MiniCssExtractPlugin.loader, 这段加了反而不会出现对模块化css编译
      ].concat(getUseLessModules()),
    }

```
 MiniCssExtractPlugin.loader加了这段，模块化css失效，取消则编译成功
 估计是还不支持吧！