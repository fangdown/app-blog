## this指针
> this, javascript关键字，是一个指针，指向一个对象。

### 骨架
谁调用指向谁

### 具体指向
1. 作为对象方法使用，指向该对象
2. 作为函数使用，指向window
3. dom事件函数中，指向该dom原生，ie事件除外，需要调用call重新指向该dom
4. 箭头函数中指向对象
5. 构造函数中指向实例
6. call/apply指向 第一个参数，若参数不存在，指向window
