## 实现继承
### es5 组合寄生模式
```js
  function Parent(name){
    this.name = name
  }
  Parent.prototype.sayName = function(){
    console.log('parent.name', this.name)
  }
  function Child(name, ParentName){
    Parent.call(this, ParentName)
    this.name = name
  }
  // 避免继承parent本身的属性
  function create(prototype){
    function F(){}
    F.prototype = prototype
    return new F()
  }
  Child.prototype = create(Parent.prototype)
  child.Prototype.sayName = function(){
    console.log('child name', this.name)
  }
  Child.prototype.constructor = Child
  
  var parent = new Parent('father')
  parent.sayName()
  var child = new Child('son', 'father')
  
```
### es6 class模式
```js
  class Parent {
    constructor(name) {
      this.name = name
    }
    sayName () {
      console.log('father name', this.name)
    }
  }
  class Child extends Parent {
    constructor(name, fatherName) {
      super(name, fatherName)
    }
    sayName () {
      console.log('child name', this.name)
    }
  }
  let p = new Parent('dad')
  p.sayName() // dad
  let c = new Child('son', 'dad')
  c.sayName() // son
```

