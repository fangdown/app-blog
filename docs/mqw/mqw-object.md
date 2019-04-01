## 面向对象类

### 类与实例
- 类的声明
  1. 传统模式
  2. es6模式
```js
  function Animal(name){
    this.name = name
  }
  class Animal{
    constructor(name){
      this.name = name
    }
  }
  
```
- 生成实例
```js
var bird = new Animal()
```
### 类与继承
如何实现继承
- 构造函数继承
```js
  function Parent1(){
    this.name = 'parent1'
  }
  Parent1.prototype.say = function(){
    console.log(this.name)
  }
  function Child1(){
    Parent1.call(this)
    this.type = 'child1'
  }
  var child = new Child1()
  // Parent1上原型链的方法不能继承
```

- 原型链继承
```js
  function Parent2(){
    this.name = 'parent2'
    this.arr = [1, 2, 3]
  }
  Parent2.prototype.say = function(){
    console.log(this.name)
  }
  function Child2(){
    this.type = 'child2'
  }
  Child2.prototype = new Parent2()
  Child2.prototype.constructor = Child2;
  var child2 = new Child2()
  var child3 = new Child2()
  child2.name = 'child2'
  child2.arr.push(4)
  console.log('child3', child3.name) // parent2  
  console.log('child3', child3.arr) // 1， 2， 3， 4，
  // 缺点： 构造函数里的数据引用的是一个地址,object类型会变化，基础类型不会变化
```

- 组合继承
```js
  function Parent3(){
    this.name = 'parent3'
    this.arr = [1, 2, 3]
  }
  Parent3.prototype.say = function(){
    console.log(this.name)
  }
  function Child3(){
    Parent3.call(this) // 重要的一句，结合了构造函数继承
    this.type = 'child3'
  }
  Child3.prototype = new Parent3() // 会增多很多属性到child3的原型对象上 child3.prototype={name, arr,...}
  Child3.prototype.constructor = Child3;
  var child4 = new Child3()
  var child5 = new Child3()
  child4.name = 'child4'
  child4.arr.push(4)
  console.log('child5', child5.name) // parent2  
  console.log('child5', child5.arr) // 1， 2， 3
  //  缺点： 两次调用parent函数,会增多很多属性到child3的原型对象上
```
- 寄生组合继承
```js
  function Parent4(){
    this.name = 'parent3'
    this.arr = [1, 2, 3]
  }
  Parent4.prototype.say = function(){
    console.log(this.name)
  }
  function Child4(){
    Parent4.call(this) // 重要的一句，结合了构造函数继承
    this.type = 'child4'
  }
  function object(prototype){
    function F(){}
    F.prototype = prototype
    return new F()
  }

  Child4.prototype = object(Parent4.prototype) // 使用空函数原型继承
  Child4.prototype.constructor = Child4;
  var child5 = new Child4()
  var child6 = new Child4()
  child5.name = 'child5'
  child5.arr.push(4)
  console.log('child6', child6.name) // parent2  
  console.log('child6', child6.arr) // 1， 2， 3
```

