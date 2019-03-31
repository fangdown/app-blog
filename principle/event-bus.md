## Event-bus
### 骨架
1. 构造一个函数对象
2. 通过constructor设定_events属性及maxListeners属性
3. 在函数的原型对象上添加方法，emit和addListener
4. addListener的作用是把类型和函数存入map中
5. emit的作用是取到该类型对应的函数，并且通过call/apply执行
6. 多个监听事件，type对应的值存入数组，在读取的是循环执行
```js
 class EventEmeitter{
     constructor(){
         this._events = this._events || new Map();
         this._maxListeners = this._maxLiseners || 10;
     }
 }
 EventEmeitter.prototype.emit = function(type, ...args){
     let handler = this._events.get(type);
     if(Array.isArray(handler)){
         for(var i = 0; i < handler.length; i++){
            if(args.length > 3){
                handler.apply(this, args)
            } else {
                handler.call(this, ...args)
            }
         }
     } else {
         if(args.length > 3){
            handler.apply(this, args)
        } else {
            handler.call(this, ...args)
        }
     }
     return true;
 }
 EventEmeitter.prototype.addListener = function (type, fn){
     const handler = this._events.get(type);
     if(!handler){
         this._events.set(type, fn)
     } else if(hanlder && typeof handler === 'function'){
         this._events.set(type, [handler, fn])
     } else {
        handler.push(fn);
     }
 }
 const emitter = new EventEmeitter();
 emitter.addListener('son', man => {
     console.log(`hi ${man}`);
 })
 emitter.emit('son', 'fangdown');
 emitter.emit('son', 'wangwu');
```