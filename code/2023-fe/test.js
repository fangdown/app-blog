function Animal(name) {
  this.name = name;
}
Animal.prototype.say = function () {
  console.log(this.name + " i m " + this.age);
};
function Dog(name, age) {
  Animal.call(this, name);
  this.age = age;
}
const withPrototype = (Parent, Child) => {
  const prototype = Object.create(Parent.prototype);
  Child.prototype = prototype;
  prototype.constructor = Child;
};

withPrototype(Animal, Dog);
const d1 = new Dog("hsq", 10);
const d2 = new Dog("bb", 2);
console.log(d1.say());
console.log(d2.say());
