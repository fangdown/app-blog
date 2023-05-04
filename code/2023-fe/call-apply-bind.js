Function.prototype.myCall = (context, ...args) => {
  let context = context || window;
  context.fn = this;
  const res = context.fn(...args);
  delete context.fn;
  return res;
};
Function.prototype.myApply = (context, args) => {
  let context = context || window;
  context.fn = this;
  const res = context.fn(...args);
  delete context.fn;
  return res;
};

Function.prototype.myBind = (context) => {
  let context = context || window;
  const args1 = [...arguments].slice(1);
  return function () {
    const args2 = [...arguments];
    context.fn = this;
    context.fn.apply(context, args1.concat(args2));
  };
};
