
const atsPath = (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'dev') ?
  '"/static/fonts/iconfont-2.10/iconfont"'
  :
  '"/static/fonts/iconfont-2.10/iconfont"';

const json = {
  '@primary-color': '#FD6720',
  // '@icon-url2': '/assets/fonts/iconfont/iconfont',
  // '@icon-url3': '"./static/media/"',
  // 将 /__aa__bb__cc/ 替换成 ../../
  // '@icon-url': '"/__aa__bb__cc/static/fonts/iconfont-2.10/iconfont"',
  // '@icon-url': '"/static/fonts/iconfont-2.10/iconfont"',
  '@icon-url': atsPath,
};

module.exports = json;
