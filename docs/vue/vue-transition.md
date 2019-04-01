
## Vue-transition动画原理
### 原理
1. 插入dom时，添加ade-enter、fade-enter-active样式，生效
2. fade-enter-active，fade-leave-active在动画消失后移除
3. 利用requestAnimationFrame在下一帧删除fade-enter样式

> 关键是requestAnimationFrame
```html
<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>
<div id="demo">
  <button v-on:click="show = !show">
    Toggle
  </button>
  <transition name="fade">
    <p v-if="show">hello</p>
  </transition>
</div>
```
```js
  new Vue({
    el: '#demo',
    data: {
      show: true
    }
  })
```
### 案例验证
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <style type="text/css">
    .box{
        width: 100px;
        height: 100px;
        background-color: red;
    }
    .enter {
        opacity: 0
    }
    .mov {
        transition: opacity 5s linear;
        --webkit-transition: opacity 5s linear;
    }
  </style>
</head>
<body>
  <div id="box" class="enter"></div>
  <script>
    var box = document.getElementById('box');
    requestAnimationFrame(function(){
      box.setAttribute('class', 'box mov');
    })
  </script>
</body>
</html>

```
[测试案例](./vue-transition.html)