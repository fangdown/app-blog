function Clousure() {
  var a = 1;
  function inner() {
    return a;
  }
  return inner;
}

const c1 = Clousure();
console.log(c1()); // 1
c1();

console.log(c1()); // 1

// 私有变量
function createPerson(name) {
  var privateName = name;
  function getName() {
    return privateName;
  }
  return {
    getName: getName,
  };
}

var myPerson = createPerson("Tom");
console.log(myPerson.getName()); // 输出Tom
console.log(myPerson.privateName); // 输出undefined

// 封装变量
function createCounter() {
  var count = 0;
  function counter() {
    count++;
    console.log(count);
  }
  return counter;
}

var myCounter = createCounter();
myCounter(); // 输出1
myCounter(); // 输出2

// 延迟执行
function delay(fn, time) {
  return function () {
    setTimeout(fn, time);
  };
}

function printHello() {
  console.log("Hello");
}

var delayedHello = delay(printHello, 1000);
delayedHello(); // 1秒后输出Hello
