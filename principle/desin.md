## 设计模式
1. 单例模式
2. 策略模式
3. 代理模式
4. 迭代器模式
5. 发布订阅模式
6. 命令模式
7. 组合模式
8. 模板方法模式
9. 享元模式
10. 职责链模式
11. 中介者模式
12. 装饰者模式
13. 状态模式
14. 适配者模式

[JavaScript中常见设计模式](https://juejin.im/post/5afe6430518825428630bc4d)

### 常见设计模式
#### 工厂模式
```js
  function CreatePerson(name, age, sex){
    var obj = new Object();
    obj.name = name;
    obj.age = age;
    obj.sex = sex;
    obj.sayName = function(){
      return this.name;
    }
    return obj;
  }
  var p = new CreatePerson('fangdown', 31, 'boy');
```
#### 单例模式
```js
  var Singleton = function(name){
    this.name = name;
  }
  Singleton.prototype.getName = function(){
    return this.name;
  }
  var getInstance = (function(){
    var instance = null;
    return function(name){
      //相当于一个一次性阀门,只能实例化一次
      if(!instance){
        instance = new Singleton(name)
      }
      console.log('instance', instance);
      return instance;
    }
  })();
  var a = getInstance('aa');
  var b = getInstance('bb'); 
  // a===b; 都是指向a，b传任何参数都无用
  // return的函数引用了函数外部的变量，闭包了，所以instance并没有被销毁，有值
```
#### 沙箱模式
将一些函数放到自执行函数里，但要用闭包暴露接口，用变量接收暴露的接口，再调用里面的值，否则无法使用里面的值。
```js
  var sandboxModel = (function(){
    var age = 31
    function sayName(name){console.log('name',name)}
    function sayAge(){console.log('age', age)}
    return {
      sayName: sayName,
      sayAge: sayAge,
    }
  })()
  sandboxModel.sayName('fangdown');
  sandboxModel.sayAge();
  // 无法直接访问age
```


#### 发布订阅模式
```js
  var shoeObj = {};
  shoeObj.list = [];
  shoeObj.listen = function(fn){
    shoeObj.list.push(fn);
  }
  shoeObj.trigger = function(){
    for(var i = 0, fn; fn = this.list[i++];){
      fn.apply(this, arguments)
    }
  }
  shoeObj.listen(function(color, size){
    console.log('颜色是', color);
    console.log('尺码是', size);
  });
  shoeObj.listen(function(color, size){
    console.log('再次打印颜色是', color);
    console.log('再次打印尺码是', size);
  });
  shoeObj.trigger('红色', 10);

```
> event bus也是利用这个模式， 双向绑定也用这个模式，很常见
