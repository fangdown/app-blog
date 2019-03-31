## proxy

### proxy 是什么
Proxy 对象用于定义基本操作的自定义行为（如属性查找，赋值，枚举，函数调用等）。
> 语法
```js
/**
 * @param target 目标对象，对象-数组-函数-另一个代理
 * @param handler 一个对象，其属性是当执行一个操作时定义代理的行为的函数。
 **/
let p = new Proxy(target, handler);
```
### proxy 能干什么
当对象中不存在属性名时，缺省返回数为37。例子中使用了 get
```js
var person = {
  name: "张三"
};

var proxy = new Proxy(person, {
  get: function(target, property) {
    if (property in target) {
      return target[property];
    } else {
      throw new ReferenceError("Property \"" + property + "\" does not exist.");
    }
  }
});

proxy.name // "张三"
proxy.age // 抛出一个错误
```
再来演示一下set
```js
var person = {
  name: "张三"
};

var proxy = new Proxy(person, {
  get: function(target, property) {
    if (property in target) {
      return target[property];
    } else {
      throw new ReferenceError("Property \"" + property + "\" does not exist.");
    }
  },
  set: function(obj, prop, value) {
    if (prop === 'age') {
      if (!Number.isInteger(value)) {
        throw new TypeError('The age is not an integer');
      }
      if (value > 200) {
        throw new RangeError('The age seems invalid');
      }
    }
    // 对于age以外的属性，直接保存
    obj[prop] = value;
  }
});
// proxy.age = 10
// proxy.age  10
```

### proxy  怎么用
[proxy实现双向绑定](../demo/proxy/proxy.html)

[实现双向绑定Proxy比defineproperty优劣如何](https://www.jianshu.com/p/2df6dcddb0d7)