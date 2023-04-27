/**
 * 观察者模式
 * 1. Subject 被观察者 表演者
 * 2. Observer 观察者 看戏的人
 * 3. Subject.add(Observer) 买票看戏
 * 4. Subject.notify() 通知表演
 * 5. Observer.update() 收到通知，看戏
 */
function Subject() {
  this.observers = [];
}
Subject.prototype = {
  add(observer) {
    this.observers.push(observer);
  },
  off() {
    this.observers = this.observers.filter((observer) => observer !== obj);
  },
  emit() {
    this.observers.forEach((observer) => observer.update());
  },
};

function Observer(name) {
  this.name = name;
}
Observer.prototype = {
  update() {
    console.log(this.name + " update");
  },
};

const s = new Subject();
const o1 = new Observer("o1");
const o2 = new Observer("o2");
s.add(o1);
s.add(o2);
s.emit();
