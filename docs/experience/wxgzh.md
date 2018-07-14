## 微信开发
### 常用方法
1. 验证微信客户端
```js
// 是否微信客户端
const isWxClient = () => {
  let microMessenger = window.navigator.userAgent.match(/MicroMessenger/i) || []
  return microMessenger[0] === 'MicroMessenger'
}
```
2. 微信登录
> 简要流程：判断是否微信--->判断有没有code--->有code直接跳入登录接口--->无code获取appid--->微信鉴权--->微信号返回的url中带code，继而登录。

3. 微信分享
> 简要流程：页面初始化执行微信初始化方法wx.config(obj), 点击了分享之后，执行wx.ready方法。成功执行success，失败执行fail
```js
    wxInit (res) {
      const self = this
      const obj = {
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: res.appid, // 必填，公众号的唯一标识
        timestamp: res.jsapi.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.jsapi.noncestr, // 必填，生成签名的随机串
        signature: res.jsapi.signature, // 必填，签名
        jsApiList: [
          'onMenuShareTimeline', // 朋友圈
          'onMenuShareAppMessage' // 聊天
        ] // 必填，需要使用的JS接口列表
      }
      wx.config(obj)
      wx.ready(function () {
        let shareData = {
          title: '分享标题', // 分享标题
          desc: '分享描述', // 分享描述
          link: '分享链接', // 分享链接
          imgUrl: '分享图标', // 分享图标
          success: function () {
            console.log('分享成功')
          },
          fail: function () {
            console.log('分享失败')
          }
        }
        wx.onMenuShareTimeline(shareData)
        wx.onMenuShareAppMessage(shareData)
    }
```

