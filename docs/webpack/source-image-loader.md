## 源码-图片加载

```
npm i file-loader -D
```

### loader
1. 大图片file-loader
```
 {
  test: /\.(png|jpg|gif)$/,
  use: [
    'file-loader'
  ]
}
```

### 想把html中的图片也能识别
```npm i html-withimg-loader```

```html
  <img src="./mv.jpg" >

```

```
 {
  test: /\.html$/,
  use: [
    'html-withimg-loader'
  ]
}
```

2. 小图片 base64

>注意区分url-loader 和file-loader的区别
url-loader包含了file-loader

这里涉及到了4个参数：limit、name、outputPath、publicPath。其中limit已经说明过。file-loader相关的是name、outputPath和publicPath。下面解释一下这3个参数
name表示输出的文件名规则，如果不添加这个参数，输出的就是默认值：文件哈希。加上[path]表示输出文件的相对路径与当前文件相对路径相同，加上[name].[ext]则表示输出文件的名字和扩展名与当前相同。加上[path]这个参数后，打包后文件中引用文件的路径也会加上这个相对路径。

outputPath表示输出文件路径前缀。图片经过url-loader打包都会打包到指定的输出文件夹下。但是我们可以指定图片在输出文件夹下的路径。比如outputPath=img/，图片被打包时，就会在输出文件夹下新建（如果没有）一个名为img的文件夹，把图片放到里面。

publicPath表示打包文件中引用文件的路径前缀，如果你的图片存放在CDN上，那么你上线时可以加上这个参数，值为CDN地址，这样就可以让项目上线后的资源引用路径指向CDN了。


[参考](https://www.jb51.net/article/154626.htm)