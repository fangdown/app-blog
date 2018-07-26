let path = require('path');
let utils = require('./utils');
let config = require('../configNew');
// let paths = require('./paths');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
// 给出正确的绝对路径
function resolve(dir) {
  return path.join(__dirname, '..', dir);
}


module.exports = {
  // 配置webpack编译入口
  entry: {
    // app: './src/index.js'
  },

  // 配置webpack输出路径和命名规则
  output: {
    // webpack输出的目标文件夹路径（例如：/dist）
    path: config.build.assetsRoot,
    // webpack输出bundle文件命名格式
    filename: '[name].js',
    // webpack编译输出的发布路径
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },

  // 配置模块resolve的规则
  resolve: {
    // 自动resolve的扩展名
    extensions: ['.js', '.jsx', '.json'],
    // resolve模块的时候要搜索的文件夹
    modules: [
      resolve('src'),
      resolve('node_modules')
    ],
    // 创建路径别名，有了别名之后引用模块更方便，例如
    alias: {
      // 'vue$': 'vue/dist/vue.common.js',
      // 'src': resolve('src'),
      // 'assets': resolve('src/assets'),
      // 'components': resolve('src/components'),
      '@store': resolve('src/store'),
      '@modules': resolve('src/modules'),
      '@common': resolve('src/common'),
      '@utils': resolve('src/common/utils'),
      '@main': resolve('src/main'),
      '@style': resolve('src/style'),
      '@images': resolve('src/images'),
    }
  },

  // 配置不同类型模块的处理规则
  module: {
    rules: [
      {// 对src和test文件夹下的.js和.jsx文件使用eslint-loader
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: eslintFormatter,
          eslintPath: require.resolve('eslint'),
        }
      },
      {
        // 使用第一个规则匹配
        oneOf: [
          {// 对src和test文件夹下的.js和.jsx文件使用babel-loader
            test: /\.(js|jsx)$/,
            loader: 'babel-loader',
            include: [resolve('src'), resolve('test')],
            options: {
              // 缓存在 ./node_modules/.cache/babel-loader/，从而能更快地 rebuild，
              cacheDirectory: true, // 可能项目大了以后该属性有影响
              plugins: [
                'transform-decorators-legacy',
                ['import', { libraryName: 'antd', style: true }],  // import less
              ],
            },
          },
          // less样式解析
          process.env.NODE_ENV === 'production' ? utils.lessModuleProd() : utils.lessModuleDev(),
          process.env.NODE_ENV === 'production' ? utils.lessCommProd() : utils.lessCommDev(),
          {// 对图片资源文件使用url-loader，query.name指明了输出的命名规则
            // test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: 'url-loader',
            query: {
              limit: 10000,
              name: utils.assetsPath('img/[name].[hash:7].[ext]'),
              publicPath: './',
            }
          },
          {// 对字体资源文件使用url-loader，query.name指明了输出的命名规则
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            query: {
              limit: 10000,
              name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
            }
          },
          {// 对其他资源文件使用file-loader，query.name指明了输出的命名规则
            exclude: [/\.js$/, /\.html$/, /\.less$/, /\.css$/, /\.json$/, /\.ejs$/],
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
              publicPath: './',
            },
          },
        ]
      }

    ]
  }
};