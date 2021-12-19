// class Car {
//   constructor(color, speed){
//     this.color = color
//     this.speed = speed
//   }
// }
// class Tk extends Car{
//   constructor(color, speed, size){
//     super(color, speed)
//     this.size  = size
//   }
// }
// const tk = new Tk('red', '100', 'small')
// console.log(tk.size) //small
// console.log(tk.color) // red

// function Parent(){
//   this.address = '腾大1号'
//   this.data = []
// }
// Parent.prototype.getData = function(){
//   console.log('hello parent')
// }
// function Child(){
//   this.type = 'sub'
// }
// Child.prototype = new Parent()
// const c1 = new Child()
// const c2  = new Child()
// c1.data.push(1)
// console.log(c1.data) // [1]
// console.log(c2.data) // [1]
// c1.getData() // hello parent

// function Parent(address){
//   this.address = address
//   this.data = []
// }
// Parent.prototype.getData = function(){
//   console.log('hello parent')
// }
// function Child(address){
//   Parent.call(this, address)
//   this.type = 'child'
// }

// const c11 = new Child('南山')
// const c12 = new Child('龙岗')
// c11.data.push(111)
// console.log(c11.address) // 南山
// console.log(c12.address) // 龙岗
// console.log(c11.data) // [111]
// console.log(c12.data) // [] 不会污染
// c11.getData() // 报错，不会继承原型链

function Parent() {
  this.data = [];
}
Parent.prototype.showName = function() {
  console.log(this.name);
};
Parent.prototype.showData = function() {
  console.log(this.data);
};
function Child(name) {
  Parent.call(this);
  this.name = name;
}

function clonePrototype(parent, child) {
  child.prototype = Object.create(parent.prototype);
  child.prototype.constructor = child;
}
clonePrototype(Parent, Child);
const c1 = new Child("c1");
const c2 = new Child("c2");
c1.data.push(5555);
c2.data.push(3333);
c1.showData(); // 实例不共享
c2.showData(); // 原型链可使用
c1.showName();
c2.showName();
// [ 5555 ]
// [ 3333 ]
// c1
// c2


class P {
  constructor(name){
    this.data = []
    this.name = name
  }
  showData(){
    console.log(this.data)
  }
  showName(){
    console.log(this.name)
  }
}
class C extends P{
  constructor(name){
    super(name)
  }
}
const cc1 = new C('cc1')
const cc2 = new C('cc2')
cc1.data.push('cc1')
cc2.data.push('cc2')
cc1.showData()
cc2.showData()
cc1.showName()
cc2.showName()

// [ 'cc1' ]
// [ 'cc2' ]
// cc1
// cc2