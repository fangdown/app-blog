// 用户点击登录按钮
wx.login({
  success: function (res) {
    if (res.code) {
      // 获取用户授权信息
      wx.getUserInfo({
        success: function (res) {
          // 将code和用户信息发送到开发者服务器
          wx.request({
            url: "https://example.com/login",
            data: {
              code: res.code,
              userInfo: res.userInfo,
            },
            success: function (res) {
              // 登录成功，保存自定义登录态
              wx.setStorageSync("token", res.data.token);
              wx.setStorageSync("userId", res.data.userId);
              // 跳转到首页
              wx.switchTab({
                url: "/pages/index/index",
              });
            },
          });
        },
      });
    } else {
      console.log("登录失败：" + res.errMsg);
    }
  },
});

// 小程序登录接口
app.post("/login", function (req, res) {
  // 获取code和用户信息
  var code = req.body.code;
  var userInfo = req.body.userInfo;
  // 调用微信开放平台接口，获取session_key和openid
  wx.login({
    code: code,
    success: function (res) {
      var sessionKey = res.session_key;
      var openid = res.openid;
      // 解密用户数据
      var pc = new WXBizDataCrypt(appId, sessionKey);
      var userData = pc.decryptData(userInfo.encryptedData, userInfo.iv);
      // 保存用户信息和自定义登录态
      var token = generateToken();
      var userId = saveUserInfo(userData);
      saveToken(token, userId);
      // 返回自定义登录态
      res.json({
        token: token,
        userId: userId,
      });
    },
  });
});
