// 公众号端代码：
// 用户点击授权按钮
wx.openOAuth({
  type: "snsapi_userinfo",
  scope: "snsapi_userinfo",
  success: function (res) {
    // 获取授权回调页面的code参数
    var code = getUrlParam(res.redirect_uri, "code");
    // 将code发送到开发者服务器
    wx.request({
      url: "https://example.com/login",
      data: {
        code: code,
      },
      success: function (res) {
        // 授权成功，保存用户信息和自定义登录态
        wx.setStorageSync("token", res.data.token);
        wx.setStorageSync("userId", res.data.userId);
        // 跳转到首页
        wx.redirectTo({
          url: "/pages/index/index",
        });
      },
    });
  },
});

// 获取URL参数的函数
function getUrlParam(url, name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = url.split("?")[1].match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
}

// 服务端
// 微信公众号登录接口
app.get("/login", function (req, res) {
  // 获取code参数
  var code = req.query.code;
  // 调用微信开放平台接口，获取access_token和openid
  wx.getAccessToken(code, function (err, result) {
    if (err) {
      console.log("获取access_token失败：" + err);
      return;
    }
    var accessToken = result.access_token;
    var openid = result.openid;
    // 调用微信开放平台接口，获取用户信息
    wx.getUserInfo(accessToken, openid, function (err, userInfo) {
      if (err) {
        console.log("获取用户信息失败：" + err);
        return;
      }
      // 保存用户信息和自定义登录态
      var token = generateToken();
      var userId = saveUserInfo(userInfo);
      saveToken(token, userId);
      // 返回自定义登录态
      res.json({
        token: token,
        userId: userId,
      });
    });
  });
});
