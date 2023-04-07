const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
/**
 * then  收集依赖
 * fn 异步触发resolve
 * 执行依赖
 */
class MyPromise {
  constructor(fn) {
    this.state = PENDING;
    this.resolveQueue = [];
    this.rejectQueue = [];
    let _resolve = (val) => {
      if (this.state !== PENDING) return;
      this.state = FULFILLED;
      while (this.resolveQueue.length) {
        this.resolveQueue.shift()(val);
      }
    };
    let _reject = (val) => {
      if (this.state !== PENDING) return;
      this.state = REJECTED;
      while (this.rejectQueue.length) {
        this.rejectQueue.shift()(val);
      }
    };
    fn(_resolve, _reject);
  }
  then(resolveFn, rejectFn) {
    this.resolveQueue.push(resolveFn);
    this.rejectQueue.push(rejectFn);
  }
}

const p1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
});
p1.then((res) => {
  console.log(res);
});
