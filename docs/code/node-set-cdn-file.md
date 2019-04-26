## node生成cdn资源对象
- 找到js、css目录
- 读取目录下的所有文件名
- 根据传入的参数做匹配并写入到某一个文件中

```js
const fs = require('fs')
const config = require('../config.coffee')
const path = require('path')
/**
 *  获取相似名称的文件名
 * @param relativePath 相对路径
 * @param filename 需要查找的文件名称
 * @return 返回查找到的带hash值的文件名
 *  */
const getFilename = (relativePath, filename) => {
  const files=fs.readdirSync(path.join(__dirname, relativePath))
  files.forEach(v => {
    v.indexOf(filename) > -1 ? newFilename = v: ''
  })
  return newFilename
}
/**
 * 将上传的cdn的js和css写入一个对象中以供引用
 * 读配置，替换内容，写配置
 * @param {*} filename 
 */
function setCdnMd5Config(options){
  fs.readFile(path.join(__dirname, '../public/cdn_md5_path.coffee'),'utf8',function(err,files){
    if(err){
      console.log('读取文件失败', err)
    }
    const options = [
      {
        type: 'css',
        name: 'game-default',
        propertyName: 'GAME_DEFAULT'
      },{
        type: 'js',
        name: 'pub-encrypt',
        propertyName: 'PUB_ENCRYPT' 
      }
    ]
    let result, reg, newValue, newfilename;

    for(var i = 0; i < options.length; i++){
      newfilename = getFilename('../public/bin/'+options[i].type+'/', options[i].name)
      reg = new RegExp(options[i].propertyName+':\'([^\']*)\'')
      newValue = options[i].propertyName+":'" +config.WEB_PATH+'/web/css/'+ newfilename+"'"
      result = files.replace(reg, newValue)
    }
    fs.writeFile(path.join(__dirname, '../public/cdn_md5_path.coffee'), result, 'utf8', function (err) {
         if (err) return console.log(err);
    });
  
  })
}
module.exports = setCdnMd5Config

```