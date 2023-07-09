let a = { n: 1 };
let b = a;
a.x = a = { n: 2 };

console.log(a.x); // undefined
console.log(b.x);
{
  n: 2;
}
//要点： 变量声明 提前，赋值在后， 倒序赋值

// 要点： 对象key只能是字符串
let a = {};
b = "100";
c = 100;
a[b] = "bbb";
a[c] = "ccc";
console.log(a[b]);

let a = {};
b = Symbol(100);
c = Symbol("100");
a[b] = "bbb";
a[c] = "ccc";
console.log(a[b]);

let a = {};
b = { key: 100 };
c = { key: 200 };
a[b] = "bbb";
a[c] = "ccc";
console.log(a[b]);

// 要点： parseInt     没有第二个参数时，第一个参数以 0x开头时， 使用16进制， 其他都是十进制,
// 第二个参数 为0时 ，按不存在处理

[1, 2, 3].map(parseInt);
// 等效于
[1, 2, 3].map((item, index) => {
  //  1, 0 , 0视为不存在，按十进制处理
  //  2, 1
  //  3, 2
  parseInt(item, index);
});

// 函数参数： 赋值传递

function fn(x) {
  x = 200;
  // 注意点 不能修改属性
  console.log("111", typeof x);
  if (typeof x === "object") {
    x.age = 222;
  }
}

let num = 100;
let obj = { name: "fang" };
fn(num);
fn(obj);
console.log(num);
console.log(obj);
