let obj = {
  age: 12,
};
Object.defineProperty(obj, "age", {
  // value: 12,
  // configurable: false,
  // enumerable: false,
  // writable: false,
  get function() {
    return this.age * 2;
  },
});
Object.defineProperty(obj, "name", {
  value: "fangdown",
  configurable: false,
  enumerable: false,
  writable: false,
});
Object.freeze(obj);
// Object.seal(obj);
obj.color = "red";
obj.age = 20;
console.log(obj.age);
console.log(obj.name);
console.log(obj.color);
