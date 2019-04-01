## Buffer

JavaScript 语言自身只有字符串数据类型，没有二进制数据类型。

但在处理像TCP流或文件流时，必须使用到二进制数据。因此在 Node.js中，定义了一个 Buffer 类，该类用来创建一个专门存放二进制数据的缓存区。

```js
var bf1 = new Buffer('hello node')
console.log(bf1)
console.log(bf1.toString())
//<Buffer 68 65 6c 6c 6f 20 6e 6f 64 65>
//hello node
```