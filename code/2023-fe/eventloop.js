setTimeout(() => {
  console.log(1);
  Promise.resolve().then(() => {
    console.log(2);
    setTimeout(() => {
      console.log(6);
    }, 200);
  });
  Promise.resolve().then(() => {
    console.log(5);
  });
}, 0);

setTimeout(() => {
  console.log(3);
  Promise.resolve().then(() => {
    console.log(4);
  });
}, 0);
// 1 2 3 4
