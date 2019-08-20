## 观察者模式及发布订阅者模式
### 观察者模式（正儿八经的设计模式）
```js

/**
 * 观察者模式
 * 观察者和发布者紧密相连，直接影响
 */
class Hunter {
  constructor(name, level){
    this.name = name
    this.level = level
    this.list = []
  }
  subscribe(target, fn){
    target.list.push(fn)
  }
  publish(money){
    this.list.forEach(item =>{
      item(money)
    })
  }
}
const hunterA = new Hunter('A', '1')
const hunterB = new Hunter('B', '1')
const hunterC = new Hunter('C', '1')

hunterA.subscribe(hunterC, function(money){
  console.log(`A ${money < 2000 ? '抱歉， 在忙': '会帮助'}`)
})
hunterB.subscribe(hunterC, function(){
  console.log('B 会帮助')
})
hunterC.publish('1000')

// A 抱歉， 在忙
// B 会帮助
```

### 发布订阅者模式（根据观察者模式衍生的设计模式）
```js
/**
 * 发布订阅模式
 * 核心：调度中心HunterUnion
 * 调度中心负责收集订阅者，负责通知订阅者
 * 业务解耦
 */

 const HunterUnion = {
  types: {},
  subscribe(type, fn){
    if(!this.types[type]){
      this.types[type] = []
    }
    this.types[type].push(fn)
  },
  publish(type, money){
    console.log(`发布打${type}任务， 金额${money}`)
    if(!this.types[type]) return
    for(let fn of this.types[type]){
      fn(money)
    }
  }
 }
 class HunterDY {
  constructor(name, level){
    this.name = name
    this.level = level
  }
  subscribe(type, fn){
    HunterUnion.subscribe(type, fn)
  }
  publish(type, money){
    HunterUnion.publish(type, money)
  }
 }
 const hunterX = new HunterDY('X', '2')
 const hunterY = new HunterDY('Y', '2')
 const hunterZ = new HunterDY('Z', '2')
 const hunterBoss = new HunterDY('BOSS', '2')
 hunterX.subscribe('tiger', function(money){
  console.log(`X ${money < 2000 ? '抱歉， 在忙': '会帮助打老虎'}`)
 })
 hunterY.subscribe('tiger', function(){
  console.log(`Y 会帮助打老虎`)
 })
 hunterZ.subscribe('wolf', function(){
  console.log(`Y 会帮助打老狼`)
 })

 hunterBoss.publish('tiger', 1000)
// 发布打tiger任务， 金额1000
// X 抱歉， 在忙
// Y 会帮助打老虎
```