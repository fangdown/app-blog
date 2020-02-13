## 常用typescript类型总结

1. interface 接口
```js
interface globalData {
  x?: boolean;
  xx?: number;
  xxx?: Record<string, any>; // 对象使用
  xxxx?: string;
}
const globalData: globalData = {
  xx: 10
}
```
2. type 接口
```js
type globalData = {
  x?: boolean;
  xx?: number;
  xxx?: Record<string, any>;
  xxxx?: string;
}
const globalData: globalData = {
  x: true
}
```
> interface和type的区别:  
interface只能定义对象类型,type可以定义组合类型，交叉类型，原始类型  
interface可以实现接口的extends和implements, type不行  
interface可以实现接口的merg，type不行


3. 自定义类型
Config类型是定义过的
```js
const config: Config = {}
```

4. as关键字
```js
let node = document.getElementById('node') as HTMLElement
let obj = xxx as Record<string, any>
```
这个as实际什么都没干，它就是一个类型断言。
告诉编译器，我认为这个对象是 HTMLElement类型的，你别瞎操心了。要不然由于类型不对，编译器会阻止你赋值，编译的时候直接报错。

```js
let s = e.name!;  // 非空断言,可避免错误提示

```
5. 混合类型
```js
const list:Array<Record<string, any>>;
// 等同
const list2: Record<string, any>[]
```
6. react组件中类型
```js

interface myState{
  isLoading: boolean;
}
export default class Manage extends Component<{}, myState> {
  state: myState= {
    isLoading: false
  }
}

interface myProps{
  userInfo: Record<string, any>
}

export default class Manage extends Component<myProps> {
  render(){
    const userInfo = this.props
  }
}
// myState，myProps可以同时使用
type Props = IProps & RouteComponentProps<any>;
export default class Manage extends Component<IProps, IState>{
  render(){
    const userInfo = this.props
  }
}

```
7. 声明文件xx.d.ts
可以把很多个interface放在一起，然后在页面中调用
```js
interface a {
  x: string;
}
interface b{
  xx: boolean;
}
//...interface z{}
```

8. 命名空间
```js
declare namespace AppModel{
  interface Base{
    x: string
  }
}

// 引用
const base: AppModel.Base = {
  x: 'fang'
}
```
