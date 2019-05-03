## 正则表达式

1. 替换含引号的字符串
```js
// 一段字符串中files
// ...
SKIN = 'DEFAULT_SKIN'
// ... 
let reg = /SKIN = \'([^\']*)\'/
let result = files.replace(reg, newSkin)

//  耗了好一会功夫
```