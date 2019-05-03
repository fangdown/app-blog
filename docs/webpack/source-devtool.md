## 源码-devtool

> 作用： 显示出错的地方

分为几类：
1. source-map , 显示行和列，生成一个文件
2. eval-source-map 显示行和列， 不生成文件
3. cheap-module-source-map 显示行， 生成一个文件
4. cheap-module-eval-source-map 显示行，不生成文件
   
```js
entry:'',
devtool: 'source-map'
```