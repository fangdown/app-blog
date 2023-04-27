/**
 * 实现一个带并发限制的异步调度器，保证同时运行的任务最多有3个
 */
class PromiseQueue {
  constructor(tasks, maxCount) {
    this.tasks = tasks;
    this.maxCount = maxCount;
    this.runingCount = 0;
    this.completeCount = 0;
  }
  run() {
    for (let i = 0; i < this.maxCount; i++) {
      this.request();
    }
  }
  request() {
    if (!this.tasks.length || this.runingCount >= this.maxCount) return;
    this.runingCount++;
    const currentTask = this.tasks.shift();
    currentTask()
      .then(() => {
        this.completeCount++;
        this.runingCount--;
        this.request();
      })
      .catch((err) => {
        this.completeCount++;
        this.runingCount--;
        this.request();
      });
  }
}
const taskQueue = new PromiseQueue(tasks, 3);
taskQueue.run();
