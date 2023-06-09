function compose(middlewares) {
  return function (ctx, next) {
    const dispatch = function (i) {
      const fn = middlewares[i];
      if (i === middlewares.length) fn = next;
      if (!fn) return Promise.resolve();
      try {
        return Promise.resolve(fn(ctx, dispatch(i + 1)));
      } catch (error) {
        return Promise.reject(error);
      }
    };
    dispatch(0);
  };
}
var z = 1;
const test = () => {
  console.log("z", z);
};
(function () {
  var z = 2;
  test();
})();

var obj = {
  name: "fff",
  getName: () => {
    this.name;
  },
};
// console.log("name", obj.getName());
var obj = "123";
var obj = [1, 2, 3];
for (let k in obj) {
  console.log("k", k);
}
(async function () {
  const p1 = Promise.resolve(100);
  const p2 = Promise.resolve(200);
  const p3 = Promise.resolve(300);

  for await (let p of [p1, p2, p3]) {
    console.log(p);
  }
})();
