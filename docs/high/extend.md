## 继承
> javascript并没有继承，不过依靠原型链，可以实现继承的方法和属性

### 骨架
1. 构造函数继承
2. 原型链继承
3. 组合继承

### 原型链继承
```js
Child.protype = new Parent()
```

### 构造函数继承
```js
function Child(){
    Parent.call(this, arguments)
}
```
### 组合继承

```js
function Parent (name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}

Parent.prototype.getName = function () {
    console.log(this.name)
}

function Child (name, age) {
    Parent.call(this, name);
    this.age = age;
}

Child.prototype = new Parent();
Child.prototype.constructor = Child;
```
