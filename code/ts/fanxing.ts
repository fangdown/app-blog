
function fn<T extends object, U extends keyof T>(obj: T, key: U) {
  console.log(obj[key])
  return obj[key] // ok
}
const obj = {
  name:'fang'
}
fn(obj, 'name')