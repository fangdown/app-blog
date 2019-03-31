## 实现definePrototype双向绑定
```html

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>defineProperty实现双向绑定</title>
</head>

<body>
  <p>
    值是： <span id="name"></span>
  </p>
  <input type="text" id="input_name" onkeyup="handleKeyUp()">
  <script>
    const obj = {
      value: ''
    }
    function handleKeyUp(e) {
      obj.value = document.getElementById('input_name').value
    }
    Object.defineProperty(obj, 'value', {
      get: function () {
        return value
      },
      set: function (newValue) {
        value = newValue
        document.getElementById('name').innerHTML = value
      }
    })
  </script>
</body>

</html>
```