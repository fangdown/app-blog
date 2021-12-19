var name = 'hello'
let obj = {
  name: 'fang',
  sayName: () => {
    console.log('this',this)
    console.log(this.name)
  }
}
obj.sayName()