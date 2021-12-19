class EventEmitter {
  constructor() {
    this.events = {};
  }
  on(type, handler) {
    if (!this.events[type]) {
      this.events[type] = [];
    }
    this.events[type].push(handler);
  }
  off(type, handler) {
    if (!this.events[type]) return;
    this.events[type] = this.events[type].filter((item) => item !== handler);
  }
  emit(type) {
    const args = [...arguments].slice(1)
    this.events[type].map(handler =>{
      handler(args)
    })
  }
  once(type,handler) {
    const fn = (...args) =>{
      handler.apply(this, args)
      this.off(type, fn)
    }
    this.on(type, fn)
  }
}
const emitter = new EventEmitter()
emitter.on('d1', ()=>{
  console.log('打老虎')
})
emitter.on('d1', ()=>{
  console.log('打狮子')
})
emitter.once('d1', ()=>{
  console.log('打豹子')
})

emitter.emit('d1')

emitter.emit('d1')