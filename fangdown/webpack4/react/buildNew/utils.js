
const path = require('path');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const config = require('../configNew');
const theme = require('./theme');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const packageConfig = require('../package.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const entryConfig = require('./webpack.entry.conf');
const paths = require('./paths');
exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory;

  return path.posix.join(assetsSubDirectory, _path);
};

exports.cssLoaders = function (options) {
  // eslint-disable-next-line
  options = options || {};

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  };

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  };

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader];

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      });
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    // if (options.extract) {
    //   return ExtractTextPlugin.extract({
    //     use: loaders,
    //     fallback: 'vue-style-loader',
    //     publicPath: '../../'
    //   });
    // } else {
    //   return ['vue-style-loader'].concat(loaders);
    // }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', {
      indentedSyntax: true
    }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  };
};

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = [];
  const loaders = exports.cssLoaders(options);

  // eslint-disable-next-line
  for (const extension in loaders) {
    const loader = loaders[extension];
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    });
  }

  return output;
};

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier');

  return (severity, errors) => {
    if (severity !== 'error') return;

    const error = errors[0];
    const filename = error.file && error.file.split('!').pop();

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    });
  };
};

// 获取页面配置入口
exports.getEntryConfig = () => {
  const pages = entryConfig.pages;
  let result = {};
  pages.forEach(page => {
    result[page.pageName] = page.entry;
  });
  return result;
};

// 插入dev环境的html
exports.getDevHtmlWebpackPlugin = function () {
  let result = [];
  const pages = entryConfig.pages;
  pages.forEach(page => {
    result.push(new HtmlWebpackPlugin({
      filename: `${page.pageName}.html`,
      template: page.template,
      inject: true,
      title: page.pageTitle,
      chunks: ['manifest', 'vendor', page.pageName]
    }));
  });
  return result;
};

// 插入生产环境的html
exports.getProdHtmlWebpackPlugin = function () {
  let result = [];
  const pages = entryConfig.pages;
  pages.forEach(page => {
    result.push(new HtmlWebpackPlugin({
      filename: `${page.pageName}.html`,
      template: page.template,
      inject: true,
      title: page.pageTitle,
      chunks: ['manifest', 'vendor', page.pageName],
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }));
  });
  return result;
};
// dev环境less样式
exports.lessCommDev = function() {
  return {
    test: /(\.less|\.css)$/,
    exclude: [
      path.resolve(paths.appSrc, 'main/'),
      path.resolve(paths.appSrc, 'modules/'),
    ],
    use: [
      require.resolve('style-loader'),
    ].concat(getUseLessCommon()),
  };
};
exports.lessModuleDev = function() {
  return {
    test: /(\.less|\.css)$/,
    include: [
      path.resolve(paths.appSrc, 'main/'),
      path.resolve(paths.appSrc, 'modules/'),
    ],
    use: [
      require.resolve('style-loader'),
    ].concat(getUseLessModules()),
  };
};
// 生成环境less样式
exports.lessCommProd = function() {
  return {
    test: /(\.less|\.css)$/,
    exclude: [
      path.resolve(paths.appSrc, 'main/'),
      path.resolve(paths.appSrc, 'modules/'),
    ],
    use: [
      // "style" loader turns CSS into JS modules that inject <style> tags.
      require.resolve('style-loader'),
      MiniCssExtractPlugin.loader,
    ].concat(getUseLessCommon()),
  };
};
exports.lessModuleProd = function() {
  return {
    test: /(\.less|\.css)$/,
    include: [
      path.resolve(paths.appSrc, 'main/'),
      path.resolve(paths.appSrc, 'modules/'),
    ],
    use: [
      // "style" loader turns CSS into JS modules that inject <style> tags.
      require.resolve('style-loader'),
      // MiniCssExtractPlugin.loader,
    ].concat(getUseLessModules()),
  };
};
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
const getUseLessCommon = () => {
  return [
    {
      loader: require.resolve('css-loader'),
      options: {
        importLoaders: 1,
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
        modifyVars: theme
      },
    },
  ];
};