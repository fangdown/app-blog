<template>
  <div id="main-history">
    <ul>
      <li><a href="/" @click="handleClick">turn yellow</a></li>
      <li><a href="/blue" @click="handleClick">turn blue</a></li>
      <li><a href="/green" @click="handleClick">turn green</a></li>
    </ul>
  </div>
</template>
<script>
  class Routers {
    constructor(){
      this.routes = {};
      this._bindPopState();
    }
    init(path){
      history.replaceState(null, null, path);
      this.routes[path] && this.routes[path]();
    }
    pushRoute(path, callback){
      this.routes[path] = callback || function(){}
    }
    go(path){
      history.pushState(null, null, path);
      this.routes[path] && this.routes[path]();
    }
    _bindPopState() {
        window.addEventListener('popstate', e => {
        const path = e.state && e.state.path;
        this.routes[path] && this.routes[path]();
        });
    }
  }
function changeBgColor(color) {
    console.log('color', color);
    var content = document.getElementById('main-history');    
    content.style.backgroundColor = color;
    console.log('content', content);
  }
export default {
  data(){
    return {

    }
  },
  mounted(){
    window.RouterHistory = new Routers();
    RouterHistory.init(location.pathname)
    RouterHistory.pushRoute('/', function(){changeBgColor('yellow')})
    RouterHistory.pushRoute('/blue',function(){changeBgColor('blue')})
    RouterHistory.pushRoute('/green', function(){changeBgColor('green')})
  },
  methods: {
    handleClick(e){
        e.preventDefault();
        window.RouterHistory.go(e.target.getAttribute('href'));
    }
  }
}
</script>
