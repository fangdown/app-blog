function bfs(tree) {
    const stack = [tree];
    const arr = [];
    while (stack.length) {
        const node = stack.shift();
        arr.push(node);
        if (node.children) {
            stack.push(...node.children);
        }
    }
    return arr;
}

function dfs(tree) {
    const stack = [tree];
    const arr = [];
    while (stack.length) {
        const node = stack.shift();
        arr.push(node);
        if (node.children) {
            stack.unshift(...node.children);
        }
    }
    return arr;
}


/**
 * 判断对象是数组和对象， 是什么返回什么
 * @param {*} obj
 * @returns copy
 */
function DeepClone(obj) {
    if (typeof obj !== "object" || obj === null) return obj;
    let copy = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            copy[key] = DeepClone(obj[key]);
        }
    }
    return copy;
}
const obj = { a: 1, b: { c: [1, 2, 3], d: 2 } };
const d1 = DeepClone(obj);
console.log(d1);

/**
 * 先比较内存地址
 * 再比较是否是null
 * 再比较类型是否相同
 * 再比较key value是否相同
 *
 * @param {*} obj1
 * @param {*} obj2
 */

function DeepEqual(obj1, obj2) {
    if (obj1 === obj2) return true;
    if (typeof obj1 !== typeof obj2 || obj1 === null || obj2 === null)
        return false;

    if (typeof obj1 === "object") {
        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);
        if (keys1.length !== keys2.length) return false;
        for (let key of keys1) {
            if (!keys2.includes(key) || !DeepEqual(obj1[key], obj2[key])) {
                return false;
            }
        }
        return true;
    }
    return false;
}

function myNew() {
    const obj = new Object();
    const constructor = [].shift.call(arguments);
    obj.__proto__ = constructor.prototype;
    var result = constructor.apply(obj, arguments);
    return typeof result === "object" ? result : obj;
  }

Function.prototype.myCall = (context, ...args) => {
    const context = context || window;
    context.fn = this;
    const res = context.fn(...args);
    delete context.fn;
    return res;
}
Function.prototype.myApply = (context, arr) => {
    const context = context || window;
    context.fn = this;
    const res = context.fn(...arr);
    delete context.fn;
    return res;
}
Function.prototype.myBind = (context, ...args) => {
    const context = context || window;
    return function () {
        const args2 = Array.prototype.slice.call(arguments);
        return this.call(context, ...args, ...args2)
    }
}

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
  const d11 = new Dog("dog");
  console.log(d11.name);
  d11.say(); // 无法继承原型上的方法
  
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
  function Animal(name) {
    this.name = name;
    this.colors = ["black", "white"];
  }
  Animal.prototype.say = function (color) {
    console.log("I am " + this.name + " and I am " + this.age);
    this.colors.push(color);
    console.log(this.colors);
  };
  
  function Dog(name, age) {
    Animal.call(this, name);
    this.age = age;
  }
  
  function inheritPrototype(Child, Parent) {
    const prototype = Object.create(Parent.prototype);
    Child.prototype = prototype;
    Child.prototype.constructor = Child;
  }
  
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
  

  function MyIterator(arr) {
    let nextIndex = 0;
    return {
      next: function () {
        return nextIndex < arr.length
          ? { value: arr[nextIndex++], done: false }
          : { value: undefined, done: true };
      },
    };
  }
  
  const p1 = MyIterator([1, 2, 3, 4]);
  const r1 = p1.next();
  console.log(r1); //{ value: 1, done: false }
  p1.next();
  p1.next();
  p1.next();
  p1.next();


  function debounce(fn, wait) {
    let timer = null;
    return function () {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      const arg = arguments;
      timer = setTimeout(() => {
        fn.apply(this, arg);
        timer = null;
      }, wait);
    };
  }
  
  function throttle(fn, wait) {
    let timer = null;
    let lastTime = 0;
    return function () {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      let self = this;
      let args = arguments;
      let nowTime = +new Date();
      const remainTime = wait - (nowTime - lastTime);
      if (remainTime <= 0) {
        fn.apply(self, args);
        lastTime = nowTime;
      } else {
        timer = setTimeout(() => {
          lastTime = +new Date();
          fn.apply(self, args);
          timer = null;
        }, remainTime);
      }
    };
  }
  
  
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

const p2 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
});
p2.then((res) => {
  console.log(res);
});


function kuaipai(arr) {
    if (arr.length < 2) return arr;
    let index = Math.floor(arr.length / 2);
    let mid = arr.splice(index, 1)[0];
    let left = [];
    let right = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] < mid) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }
    return kuaipai(left).concat(mid, kuaipai(right));
  }
  
  const arr = [1, 11, 3, 9, 5, 6, 4];
  const result = kuaipai(arr);
  console.log(result);
  

  function maopao(arr) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
    console.log("arr", arr);
    return arr;
  }
  maopao([1, 11, 3, 9, 5, 6, 4]);

  

  const images = document.getElementsByTagName("img");
const useGetBoundingClientRect = () => {
  for (let i of images) {
    const top = i.getBoundingClientRect().top;
    const isShow = top > 0 && top < window.innerHeight;
    if (isShow) {
      let imgSrc = i.getAttribute("data-src");
      i.setAttribute("src", imgSrc);
    }
  }
};

const useIntersectionObserver = () => {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        let imgSrc = entry.target.getAttribute("data-src");
        entry.target.setAttribute("src", imgSrc);
      }
    });
  });
};

const useOffsetTop = () => {
  for (let i of images) {
    const top = i.offsetTop;
    const isShow = top > 0 && top < window.innerHeight + window.scrollY;
    if (isShow) {
      let imgSrc = i.getAttribute("data-src");
      i.setAttribute("src", imgSrc);
    }
  }
};


let xhr = new XMLHttpRequest();
xhr.open("GET", "https://www.baidu.com", true);
xhr.setRequestHeader("Content-Type", "application/json");
xhr.send("username=admin&password=123456");
xhr.onreadystatechange = function () {
  if (xhr.readyState == 4) {
    console.log(xhr.responseText);
  }
};


const clientWidth =
document.documentElement.clientWidth || document.body.clientWidth;
document.documentElement.style.fontSize =
100 * (clientWidth / 750) * (window.devicePixelRatio || 1) + "px";

// markdown-loader
module.exports = function (source) {
    const html = marked(source);
    return `module.exports = ${JSON.stringify(html)}`;
  };
  
  const { getOptions } = require("loader-utils");
  const sharp = require("sharp");
  
  // 图片处理
  module.exports = function (source) {
    const options = getOptions(this);
    const { width, height } = options;
  
    return sharp(source)
      .resize(width, height)
      .toBuffer()
      .then((buffer) => {
        return `module.exports = ${JSON.stringify(buffer.toString("base64"))}`;
      });
  };
  
  document.querySelector("#iptFile").onchange = function () {
    let file = this.files[0];
    if (file === undefined) return alert("请选择文件");
    let fd = new FormData();
    fd.append("name", file);
    axios({
      method: "POST",
      url: "http://localhost:3000/upload",
      data: fd,
    }).then((res) => {
      console.log(res);
      if (res.code !== 0) return res.message;
      document.querySelector("#img").src = res.data;
      return alert("上传成功");
    });
  };

  
  
/* 图片 */
// .border-1px {
//     border-width: 0 0 1px 0;
//     border-style: solid;
//     border-image: url(border.png) 0 0 1 stretch;
//   }
  
//   /* 伪类 */
//   .scale-1px {
//     position: relative;
//   }
//   .scale-1px::after {
//     content: '';
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 1px;
//     background-color: #000;
//     transform-origin: 0 0;
//     transform: scaleY(0.5);
//   }
//   /* viewport设置 */
//   /* <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"> */
//   .border-1px {
//     position: relative;
//     border-bottom: 1px solid #000;
//   }
//   .border-1px::after {
//     content: '';
//     position: absolute;
//     bottom: -1px;
//     left: 0;
//     width: 100%;
//     height: 1px;
//     background-color: #000;
//     transform-origin: 0 0;
//     transform: scaleY(0.5);
//   }
//   /* 阴影 */
//   .box-shadow-1px {
//     box-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
//   }
