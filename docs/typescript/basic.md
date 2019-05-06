## typescript入门

### 一、基本数据类型定义
```ts
// 基本数据类型
// let num = 25
let flo = 25.5
let hex = 0xf000
let binary = 0b1001
let octal = 0o733

// num = '25' // 不能更改存储类型
let num: number = 25

// boolean
 let isLogin = false
//  isLogin  = 1 // 不行

// string
let str:string = 'hello world'
// str = 1 // 不行

let anything
anything = 25
anything = 'hello'

```
### 二、数组 元组 枚举
```ts
// 数组元组 枚举
let names:Array<string> = ['fang', 'down']
console.log(names[0])
// names[0] =  1 // 不行
// names = '123' // 不行

let numbers:Array<number> = [1, 2]
let numbers2: number[] = [1, 3]
let arr3: string[] = ['fang', 'test']


// 元组(混合型)
let colors:[string, number] = ['hello', 123]


// 枚举
enum Color{
  Black = 0,
  Yellow = 'test',
  Red=1
}

let myColor:Color =  Color.Black

console.log(myColor)
```
### 三、 函数
```ts
// 函数
// 返回值类型
function returnValue ():string {
  // return 22 // 不行
  return 'hello'
}

console.log(returnValue())

// 返回空
function sayHello(name:string):void{
  console.log('hello'+name)
}
// 参数返回值
function sumValue(x:number, y:number):number{
  return x + y
}

// 函数类型

let myFunc
myFunc = sayHello
myFunc('fang')
myFunc = sumValue(1, 2)
// => 转化成制定类型
let myFunc2: (a:number,b:number) => number
```

### 四、对象
```ts
// object type

let dataObj = {
  name: 'fang',
  age: 33
}
// 不行
// dataObj = {

// }
// dataObj = {
//   a: 'hello',
//   b: 2
// }
// => 注意是花括号
let dataObj2:{name:string, age: number} ={
  name: 'fang',
  age: 33
}

// 复杂类型
let complex: {data: number[], myFunc:(item:number) => number[]} ={
  data: [1,2],
  myFunc: function(item:number):number[]{
    this.data.push(item)
    return this.data
  }
}
// type 生成类型
type myType = {data: number[], myFunc:(item:number) => number[]}
let complex2: myType = {
  data: [1,2],
  myFunc: function(item:number):number[]{
    this.data.push(item)
    return this.data
  }
}

// union type null undefined never
let unionType: number|string|boolean = 12 // 联合类型
unionType = 'fang'

// 检查类型
let checkType = 10
if(typeof checkType === 'number'){
  console.log('number')
}
// null 和 undefined
let myNull = null

myNull = undefined

// never
// never是任何类型的子类型
let x:never
// x = 123 不行
// 应用场景
function error(message:string): never{
  throw new Error(message)
}
// 死循环
function loop(): never{
  while (true){}
}

let y:number
y = (() => {
  throw new Error('message')
})()
```
### 五、class类
```ts
// class类（属性 方法）
/**
 * public 公共的， 暴露出去的
 * protected 内部或者子集可访问
 * private 只能内部使用
 */
class Person {
  name: string;
  protected gender: string;
  private age: number = 27;

  constructor(name:string, gender:string, public username:string){
    this.name = name
    this.username = username
    this.gender = gender
  }
  sayAge(){
    console.log(this.age)
  }
  sayGender(){
    console.log(this.gender)
  }
}

const person = new Person('fang','man', 'down')
console.log(person.name, person.username)
// 访问不到person.gender

person.sayGender()

// student类继承person类
class Student extends Person {
  studentId:string
  constructor(name:string, gender:string, username: string, studentId:string){
    super(name, gender, username)
    // console.log(this.age) 不行
    this.studentId = studentId
  }
  sayId(){
    console.log(this.studentId)
  }
  // 重写父类方法
  sayGender(){
    console.log(this.gender+' from stduent')
  }
}

const student = new Student('lu', 'woman', 'fang', '111')
console.log(student)
student.sayId()
student.sayGender()
```
### 六、class 修饰词 静态属性及方法
```ts
// class set get修饰词 用于隔离私有属性和可公开属性
// class 静态属性和方法


class Person2 {
  private _name:string ='fang'
  static PI:number = 3.14 // 静态属性， 可以直接访问，不用实例化
  static calcCircle(value:number):number{
    return this.PI*value
  }
  set setName(value:string){
    this._name = value
  }
  get getName(){
    return this._name
  }
}

let person2 = new Person2()
console.log(person2.getName)

person2.setName = 'lulu' // 注意这个写法，不是调用函数，而是类似一个属性
console.log(person2.getName)

console.log(Person2.calcCircle(5))

console.log(Person2.PI)
```
### 七、命名空间
```ts
// namespace 命名空间
// 引入文件
/// <reference path="lesson7.ts" />
namespace MyMath {
  // 多重命名空间
  export namespace Circle {
    export const circle = 98
  }
  const PI = 3.14
  export function getSum(x: number, y: number): number{
    return x + y
  }

  function calcCircle(value:number){
    return value*PI
  }
}
// console.log(getSum(1, 2)) 不行
console.log(MyMath.getSum(1, 2))
const PI = 2.11
console.log(PI)
```
### 八、模块
```ts
// 模块
import {PI, calcCircle} from './circle'
console.log(PI)
```
### 九、implaments 及extends
```ts
// implements 实现
interface PersonInterface {
  name: string;
  age: number;
  sex?: string; // ? 可选
  readonly salary: number; //只读
  [propName:string]: any;
  greet():void
}

interface StudentInterface{
  id: number,
  course: string
}
// 可多个实现
class People implements PersonInterface, StudentInterface{
  name: string = 'fang';
  age: number = 33;
  salary: number = 8000;
  id: number = 101;
  course: string = 'it';
  greet(){
    console.log('hello fang')
  }
}
// interface接口继承,包含父类必有属性及自身属性
interface Employee extends PersonInterface{
  eid: string
}
const employee: Employee ={
  eid: '111',
  name: 'fang',
  age: 33,
  salary:8000,
  greet(){
    console.log('hello fang')
  }
}
```
### 十、泛型
```ts
// 泛型 generic
// 函数中使用泛型

function identify<T>(arg:T):T{
  return arg
}

console.log(identify(11))
// 指定类型
console.log(identify<string>('11'))


// 接口中使用泛型
interface GenericIdentify<T>{
  (arg:T): T
}
let myIdentify: GenericIdentify<string> = identify


function getLen<T>(obj:T):any{
  return obj
}
const obj1 = {
  name: 'fang',
  age: 30
}
getLen(obj1)
//  为泛型添加约束
function getLen2<T extends number>(obj:T):any{
  return obj
}
getLen2(25)

// 泛型 -class

class CountNumber<T>{
  number1: T
  number2: T
  constructor(num1:T, num2:T){
    this.number1 = num1
    this.number2 = num2
  }
  calcalate():number{
    return +this.number1 + +this.number2
  }
}
const cn = new CountNumber<number>(10, 209)
console.log(cn.calcalate())

```