/**
 *
 * @param  {...any} funcs
 * @returns 关键点  while循环   return  f1 递归 ，跳出条件
 */
const compose = function (...funcs) {
  let result;
  const list = [...funcs];
  return function f1(...args1) {
    while (list.length) {
      result = list.pop().apply(this, args1);
      return f1(result);
    }
    return result;
  };
};
function add(x, y) {
  return x + y;
}

function square(x) {
  return x * 5;
}

function toStr(x) {
  return String(x);
}
var composedFunc = compose(toStr, square, add);
console.log(composedFunc(2, 3)); // "25"
