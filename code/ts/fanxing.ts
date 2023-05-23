
function fn<T extends object, K extends keyof T>(obj: T, key: K): T[K] {
  console.log(obj[key])
  return obj[key] // ok
}
const obj = {
  name: 'fang'
}
fn(obj, 'name')