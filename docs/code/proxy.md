## 实现proxy双向绑定

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>proxy实现双向绑定</title>
</head>

<body>
  <p>
    值是： <span id="name"></span>
  </p>
  <input type="text" id="input_name" onkeyup="handleKeyUp()">
  <script>
    const obj = {}
    const newObj = new Proxy(obj, {
      get: function (target, key, receiver) {
        return Reflect.get(target, key, receiver)
      },
      set: function (target, key, value, receiver) {
        if (key === 'value') {
          document.getElementById('name').innerHTML = value
        }
        return Reflect.set(target, key, value, receiver)
      }
    })
    function handleKeyUp(e) {
      newObj.value = document.getElementById('input_name').value
      // newObj.age = 30
    }
  </script>
</body>

</html>

```