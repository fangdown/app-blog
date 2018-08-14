## 开发日常-1
## ajax上传
```js
var formData = new FormData();
formData.append(name, value)
ajax({
  ...,
  contentType:false,
  processData:false
})

```
[参考](https://www.cnblogs.com/fengxuehuanlin/p/5311648.html)

### 监听input变化
```
在元素上绑定input propertychange，执行回调
```
[参考](https://blog.csdn.net/spy19881201/article/details/25537225)

### decodeURI 和 decodURIComponent的区别
```
最明显的就是有些字符不能被解码： ;,/?@&=+$等
```
[参考](https://www.cnblogs.com/Nirvana-zsy/p/7484279.html)

### DOM的constructor是什么
```
document.getElementById('xxx').constructor == ?

...因为dom元素对象没有constructor.
constructor是对创建对象的函数的引用（指针），是构造函数，只有js对象才有，dom对象是没有的。
比如一个数组的constructor就是Array函数，一个object的constructor就是Object函数.
自定义对象的constructor就是该自定义函数。
比如 function myObj(id,class){
this.id = id;
this.class = class;
}
var obj = new myObj("mytable","tableClass");
console.log(obj.constructor); //会在控制台输出 myObj
```