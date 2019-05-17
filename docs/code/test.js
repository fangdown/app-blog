// var A
// (function(name){
//   var instance
//   A = function(name){
//     if(instance){
//       return instance
//     }
//     intance = this
//     this.name = name
//   }
//   A.prototype.sayName = function(){
//     console.log(this.name)
//   }
//   A.prototype.age = 'a1-10'
// })()
// var a1 = new A('a1')
// var a2 = new A('a2')
// console.log(a1)
// console.log(a2)
// console.log(a1.age)
// console.log(a2.age)

var single = {
  _singleton: null,
  getSingleton: function(name){
    if(!this._singleton){
      this._singleton = {}
      this._singleton.name = []
      this._singleton.name.push(name)
    }
    return this._singleton
  }
}
var a1 = single.getSingleton('fang')
var a2 = single.getSingleton('wang')
console.log(a1) // { name: [ 'fang' ] }
console.log(a2) // { name: [ 'fang' ] }

