## fetch超时设置

> 原理：利用promise.race方法实现

```js
  Promise.race([
    fetchUrl,
    new Promise((resolve, reject)=>{
      setTimeout(()=>{
        reject(new Error('request time out'))
      }, 5000)
    })
  ]
  ).then((data) => {
    // 成功
  }).catch((err) => {
    // 失败
  })

```