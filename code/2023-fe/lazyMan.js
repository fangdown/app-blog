class LazyMan {
  constructor(name) {
    this.name = name;
    this.taskList = [];
    setTimeout(() => {
      this.next();
    });
  }
  next() {
    const task = this.taskList.shift();
    task?.();
  }
  eat(food) {
    const task = () => {
      console.log(`${this.name} eat ${food}`);
      this.next();
    };
    this.taskList.push(task);
    return this;
  }
  sleep(times) {
    const task = () => {
      console.log(`${this.name} 开始睡觉`);
      setTimeout(() => {
        console.log(`${this.name} 睡了 ${times} s`);
        // 不要遗漏
        this.next();
      }, times * 1000);
    };
    this.taskList.push(task);
    return this;
  }
}

const lz = new LazyMan("fang");
lz.eat("包子").eat("苹果").sleep(2).eat("water");
