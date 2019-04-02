## 了解component is

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>测试component变化</title>
  <script src="https://cdn.bootcss.com/vue/2.6.10/vue.min.js"></script>
</head>

<body>
  <div id="app">
    <p @click="handleChange">测试component变化</p>
    <component :is="name"></component>
  </div>
  <script>
    var componentA = {
      template: `<div>我是A组件</div>`
    }
    var componentB = {
      template: `<div>我是B组件</div>`
    }
    var componentC = {
      template: `<div>我是C组件</div>`
    }
    new Vue({
      el: '#app',
      components: {
        componentA,
        componentB,
        componentC
      },
      data: {
        name: 'componentA'
      },
      methods: {
        handleChange() {
          const arr = ['componentA', 'componentB', 'componentC']
          this.name = arr[Math.round(Math.random() * (arr.length - 1))]
        }
      }
    })
  </script>
</body>

</html>
```