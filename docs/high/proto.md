## 原型链
### 骨架
```
实例.__proto__ = 构造函数.prototype

```
- 一切皆对象
- 实例通过构造函数new出来
- 实例的原型指向构造函数的原型对象
- 一直往上查找的链路就是原型链

### 类型
- 普通对象object
- 函数对象function  

```js
    var o = new Object();
    o.__proto__;//Object {}
    o.prototype;//undefined
    Object.prototype;//Object {}
    Object.__proto__;//function(){}
    Object.__proto__.__proto__;//Object {}

    var f = new Function();
    f.__proto__;//function(){}
    f.prototype;//Object {}
    Function.prototype;//function(){}
    Function.__proto__;//function(){}
    Function.__proto__.__proto__;//Object {}
```

![](https://github.com/mqyqingfeng/Blog/raw/master/Images/prototype5.png)

### 比喻
康熙（Null）生了许多个儿子
Object.prototype
每个儿子本事都不一样
Function
String Number Boolean Date  
每个儿子又生了好多子女， 依次反复  
不管怎么生，

![](https://images2015.cnblogs.com/blog/831429/201512/831429-20151214115524240-1562559241.png)