function observe(obj) {
  for (let key in obj) {
    let internalValue = obj[key];
    let funs = [];
    Object.defineProperty(obj, key, {
      get: function () {
        if (window.__fn && !funs.includes(window.__fn)) {
          funs.push(window.__fn);
        }
        return internalValue;
      },
      set: function (val) {
        internalValue = val;
        funs.forEach((fn) => fn());
      },
    });
  }
}
function autorun(fn) {
  window.__fn = fn;
  fn();
  window.__fn = null;
}
