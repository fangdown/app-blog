function debounce(fn, wait){
  let timeout
  return function (){
    clearTimeout(timeout)
    const context = this || {}
    const args = [...arguments]
    timeout = setTimeout(() => {
      fn.apply(context, args)
    }, wait);
  }
}
debounce(()=>{console.log('debounce')},500)


function throttle(fn, wait){
  let timer
  return function(){
    if(!timer){
      const context = this || {}
      const args = [...arguments]
      timer = setTimeout(() => {
        fn.apply(context, args)
        timer = null
      }, wait);
    }

  }
}