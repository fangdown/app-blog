## 实现ajax
```js
var xhr = new XMLHttpRequest()
xhr.open(method, url, async)
let params;
for (var key in opt.data){
    params.push(key + '=' + opt.data[key]);
}
let postData = params.join('&');
xhr.send(data)
xhr.onreadystatechange = function(e){
  if(xhr.readyState === 4){
    if(xhr.status === 200){
      done(xhr.responseText)
    }
  }
}
xhr.onload = function(){
  console.log("READYSTATE"+ xhr.readyState);
   onsole.log(this.responseText);
}
```