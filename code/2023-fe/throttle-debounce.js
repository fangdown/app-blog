// 有计数器清除，重新搞计时器
function debounce(fn, wait) {
  let timer = null;
  return function () {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    const self = this;
    const args = [...arguments];
    timer = setTimeout(() => {
      fn.apply(self, args);
      timer = null;
    }, wait);
  };
}
//有计时器清除，判断剩余时间， 若没有剩余时间了， 立即执行， 若还有一点剩余时间，起个剩余时间的定时器，
function throttle(fn, wait) {
  let timer = null;
  let lastTime = 0;
  return function () {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    const self = this;
    const args = [...arguments];
    const now = +Date.now();
    const remainTime = wait - (now - lastTime);
    if (remainTime <= 0) {
      fn.apply(self, args);
      lastTime = now;
    } else {
      setTimeout(() => {
        fn.apply(self, args);
        lastTime = +Date.now();
        timer = null;
      }, remainTime);
    }
  };
}
