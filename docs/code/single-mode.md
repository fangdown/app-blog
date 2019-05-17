## 单例模式

```js
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

```