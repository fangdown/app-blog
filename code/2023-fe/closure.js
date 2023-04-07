function Clousure() {
  var a = 1;
  function inner() {
    return a;
  }
  return inner;
}

const c1 = Clousure();
console.log(c1()); // 1
c1();

console.log(c1()); // 1
