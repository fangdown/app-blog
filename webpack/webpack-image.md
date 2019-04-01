## webpack优化图片
webpack打包时，会根据webpack.config.js 中url-loader中设置的limit大小来对图片进行处理，小于limit的图片转化成base64格式，其余的不做操作。对于比较大的图片我们可以用image-webpack-loader 来压缩图片。 
```
npm install image-webpack-loader --save-dev
```
在 webpack.config.js 中配置
```js
{
  test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
  use:[
    {
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: utils.assetsPath('img/[name].[hash:7].[ext]')
      }
    },
    {
      loader: 'image-webpack-loader',// 压缩图片
      options: {
        bypassOnDebug: true,
      }
    }
  ]
}
```
最初打包压缩后整个包有11.4M,查了下发现是引入的苹果字体库就有11多M，删除了该大包袱后，整个包资源锐减到3.24M，后再次进行图片的压缩，就用上面的方法，体积缩减到2.16M，将项目中png图片在线转换为jpg后，体积再次缩减到1.82M。

因为代码要放到腾讯云上面，涉及到带宽流量问题，我们进行了整个包资源的优化，最后用户下载的话就只需下载1.82M的流量包即可。

 经过业务逻辑叠加，我们打包后代码到了2M了，我们老大需要check我的包代码，发现里面有map文件没有去掉，然后我又进行了map文件的清理：

运行 cnpm run build 开始打包后会在项目目录下自动创建dist目录，打包好的文件都在其中 
解决办法：去src/config/index.js中改一个参数： 
productionSourceMap:false 
把这个改为false。不然在最终打包的文件中会出现一些map文件

map文件的作用：项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错。 
有了map就可以像未加密的代码一样，准确的输出是哪一行哪一列有错。

然后2M多的项目去掉map文件打包后仅剩775K，不足1M的量，突然发现以前我写的项目包应该都是蛮大的吧[捂脸]，对不起使用我写的项目的用户鸭，真是抱歉啊，没有真实为着用户着想，我的锅！