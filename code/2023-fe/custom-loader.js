// markdown-loader
module.exports = function (source) {
  const html = marked(source);
  return `module.exports = ${JSON.stringify(html)}`;
};

const { getOptions } = require("loader-utils");
const sharp = require("sharp");

// 图片处理
module.exports = function (source) {
  const options = getOptions(this);
  const { width, height } = options;

  return sharp(source)
    .resize(width, height)
    .toBuffer()
    .then((buffer) => {
      return `module.exports = ${JSON.stringify(buffer.toString("base64"))}`;
    });
};
