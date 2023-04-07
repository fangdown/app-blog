/**
 * 发布订阅模式
 * 1. 事件中心
 * 2. 订阅者
 * 3. 发布者
 * 4. 订阅者订阅事件
 * 5. 发布者发布事件
 * 6. 事件中心通知订阅者
 * 7. 订阅者收到通知，执行回调
 * 8. 订阅者取消订阅
 * 9. 发布者发布事件
 * 10. 事件中心不通知订阅者
 * 11. 订阅者收不到通知，不执行回调
 * 12. 订阅者取消订阅
 * 区别：观察者是一个数组，发布订阅是一个对象，发布订阅对象的事件可以理解成一个观察者数组
 */
function PublishObserver() {
  this._observers = {};
}

PublishObserver.prototype = {
  add(event, fn) {
    this._observers[event] = this._observers[event] || [];
    this._observers[event].push(fn);
  },
  emit(event, data) {
    if (this._observers[event]) {
      this._observers[event].forEach((fn) => fn(data));
    }
  },
  off(event, fn) {
    if (this._observers[event]) {
      this._observers[event] = this._observers[event].filter(
        (item) => item !== fn
      );
    }
  },
};

const p = new PublishObserver();
const fn1 = (data) => console.log("fn1", data);
const fn2 = (data) => console.log("fn2", data);
p.add("event1", fn1);
p.add("event2", fn2);
p.emit("event1", "data1");
p.off("event1", fn1);
p.emit("event1", "data1");
p.emit("event2", "data2");
