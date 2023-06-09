/**
 * @description 单例模式
 * 匿名函数自执行，返回一个函数，这个函数是一个构造函数
 */
const MySingleton = (function () {
  let instance;
  return function (name) {
    if (!instance) {
      instance = this;
      this.name = name;
    }
    return instance;
  };
})();

const a = new MySingleton("a");
const b = new MySingleton("b");

console.log(a === b);
console.log(a.name);
console.log(b.name);

class Mysingleton2 {
  constructor() {}
  static instance;
  static getInstance() {
    if (!this.instance) {
      this.instance = new Mysingleton2();
    }
    return this.instance;
  }
  f1() {}
  f2() {}
}

const m1 = Mysingleton2.getInstance();
const m2 = Mysingleton2.getInstance();
console.log(m1 === m2);
