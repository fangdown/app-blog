function debounce(fn, delay) {
  let timer;

  return function () {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    const self = this;
    const args = [...arguments];
    timer = setTimeout(() => {
      fn.apply(self, args);
    }, delay);
  };
}

function throttle(fn, delay) {
  let timer;
  let lastTime = 0;
  return function () {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    const self = this;
    const args1 = [...arguments];
    const now = +Date.now();
    const remainTime = delay - (now - lastTime);
    if (remainTime <= 0) {
      fn.apply(self, args1);
      lastTime = now;
    } else {
      timer = setTimeout(() => {
        fn.apply(self, args1);
        timer = null;
        lastTime = +Date.now();
      }, remainTime);
    }
  };
}
