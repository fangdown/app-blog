// 构造函数继承
function Animal(name) {
  this.name = name;
}
Animal.prototype.say = function () {
  console.log("I am " + this.name);
};

function Dog(name, age) {
  Animal.call(this, name);
  this.age = age;
}
const d1 = new Dog("dog");
console.log(d1.name);
d1.say(); // 无法继承原型上的方法

// 原型链继承
function Animal(name) {
  this.name = name;
  this.colors = ["black", "white"];
}
Animal.prototype.say = function (color) {
  console.log("I am " + this.name);
  this.colors.push(color);
  console.log(this.colors);
};

function Dog() {}
Dog.prototype = new Animal("dog");
Dog.prototype.constructor = Dog;
const d3 = new Dog();
d3.say("red");
const d4 = new Dog();
d4.say("blue"); // 原型污染 [ 'black', 'white', 'red', 'blue' ]

// 寄生组合
// function Animal(name) {
//   this.name = name;
//   this.colors = ["black", "white"];
// }
// Animal.prototype.say = function (color) {
//   console.log("I am " + this.name + " and I am " + this.age);
//   this.colors.push(color);
//   console.log(this.colors);
// };

// function Dog(name, age) {
//   Animal.call(this, name);
//   this.age = age;
// }

// function inheritPrototype(Child, Parent) {
//   const prototype = Object.create(Parent.prototype);
//   Child.prototype = prototype;
//   Child.prototype.constructor = Child;
// }

// inheritPrototype(Dog, Animal);

// const d1 = new Dog("dog", 3);
// const d2 = new Dog("dog", 5);
// d1.say("red");
// d2.say("blue");

class Animal {
  constructor(name) {
    this.name = name;
  }
  say() {
    console.log("I am " + this.name);
  }
}

class Dog extends Animal {
  constructor(name, age) {
    super(name);
    this.age = age;
  }
  sayAge() {
    console.log("I am " + this.age);
  }
}
const d5 = new Dog("dog", 5);
d5.say();
d5.sayAge();
const d6 = new Dog("dog", 7);
d6.say();
d6.sayAge();
