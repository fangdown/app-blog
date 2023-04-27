function myNew() {
  const obj = new Object();
  const constructor = [].shift.call(arguments);
  obj.__proto__ = constructor.prototype;
  var result = constructor.apply(obj, arguments);
  return typeof result === "object" ? result : obj;
}

function Test(name, age) {
  this.name = name;
  this.age = age;
  return 100;
}

function Test2(name, age) {
  this.age = age;
  this.name = name;
  return { age, name };
}
const t1 = myNew(Test, "test1", 10);
console.log(t1);

const t2 = myNew(Test2, "test2", 20);
console.log(t2);
