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
