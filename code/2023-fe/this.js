function Foo(line) {
  const n = parseInt(line);
  const res = new Array(n).fill().map((item) => []);
  let cur = 1;
  for (let i = 0; i < n; i++) {
    for (let j = i; j >= 0; j--) {
      res[j].push(cur);
      console.log(res);
      cur++;
    }
  }
  for (let x of res) {
    console.log(x.join(" "));
  }
}
Foo(5);
