const path = require('path');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  pages: [{
    pageName: 'index',
    template: resolve('src/public/template/index.ejs'),
    pageTitle: '平安招聘-微官网',
    entry: [require.resolve('babel-polyfill'), resolve('src/index.js')]
  }]
};
