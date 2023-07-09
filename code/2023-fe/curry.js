// 先计算函数需要参数个数
// 定义中间函数，参数不够返回中间函数，参数够，执行函数
function curry2(fn) {
  const fnArgsLen = fn.length;
  let args = [];
  function calc(...newArgs) {
    // 积累参数
    args = [...args, ...newArgs];
    // 参数不够，返回calc
    if (args.length < fnArgsLen) {
      return calc;
    }
    // 参数够了执行fn
    return fn(...args.slice(0, fnArgsLen));
  }
  return calc;
}

// 测试 1
function add(a, b, c) {
  return a + b + c;
}
console.log(curry2(add)(10)(20)(30));
// console.log(curry(add, 1)(3, 4));
