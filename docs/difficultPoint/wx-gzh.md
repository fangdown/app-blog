## 公众号授权

### 流程
流程很重要，这次搞公众号耗费了较长时间，主要是后端接口是写好的，前端熟人周末也不在，在一个不熟悉的环境中，要完成功能，确实很瞎，遇到阻塞的时候容易着急

流程：
1. 页面请求接口，根据公众号向node中间件发起接口请求，参数为wsid
2. node层新建一个实例wechatAuth，实例上有redirectUrl和entryUrl属性，authForRabbit方法
21. 获取redis 缓存，如果有，则返回url为null 
3. 调用authForRabbit方法向后端发起请求，参数为wsId,scope,redirectUrl,包含了entryUrl, 得到微信认证的url
4. 返回该url，前端页面进行跳转，跳入微信页面，认证完成后， 跳后端服务地址
5. 后端处理后在entryUrl中拼接token，wsId, entryUrl, scope等，跳转wechatAuthCallback
6. node接受wechatAuthCallback，解析url参数
7. 根据token发起后端请求获取用户信息，如姓名，unionid等
8. 将unionid数据存入redis中
9. node跳转页面entryUrl
10. 页面重复1的过程

### 坑
1. 白名单，在微信调试工具中，跳转链接需要设置白名单，（后端限制了，后端添加）
2. 要加入该微信的开发者中（微信网页-开发者设置中）
3. 缓存的问题

### 具体步骤
1.  前端页面发请求
```js
// ...获取页面url中的参数
const url = `/workwechat/miniappqrcode?orgId=${newOrgId}&userId=${newUserId}&wsid=${newWsid}`;
const data = await getPluginLoginPage(newWsid, url);
if (data) {
  location.href = data;
}
```

2. node层实例wechatAuth
```js
router.get(
  '/api/getPluginLoginPage',
  catchError(async (req, res) => {
    const authUrl = await workwechatAuth.initWechatAuth(req, res);
    response.json(res, authUrl);
  })
);
 // auth.js
//  WechatAuth类方法
 export class WechatAuth {
  // 授权成功重定向地址
  redirectUrl: string;
  // 入口地址
  entryUrl: string;
  req: Request;
  res: Response;
  session: ISession;

  constructor(opts: ConstructorOpts) {
    this.redirectUrl = opts.redirectUrl;
    this.entryUrl = opts.entryUrl;
    this.req = opts.req;
    this.res = opts.res;
    this.session = opts.session;
  }

  async authForRabbit(scope: Scope) {
    const wsId = this.req.query.wsId;
    const userId = this.req.query.userId;
    const orgId = this.req.query.orgId;
    const params2 = {
      wsId,
      scope,
      redirectUrl:
        this.redirectUrl +
        '?' +
        qs.stringify({
          wsId,
          userId,
          orgId,
          entryUrl: this.entryUrl,
        }),
    };
    const { authUrl } = await getWechatAuthorizeLoginUrl(params2);
    if (authUrl) {
      return authUrl;
    }
    return '';
  }
}
export async function initWechatAuth(req: Request, res: Response) {
  const session = req.session as ISession;
  const wechatAuth = new WechatAuth({
    redirectUrl: getRedirectUrl(req),
    entryUrl: req.query.entryUrl,
    req,
    res,
    session,
  });
  const rabbitCacheData = (await getRedisData(
    session,
    req.query.wsId
  )) as IRedisAuth;
  // 有缓存，保存关联关系
  if (rabbitCacheData.unionid) {
    const parseUrl = qs.parse(req.query.entryUrl.split('?')[1]);
    const userId = parseUrl.userId + '';
    const orgId = parseUrl.orgId + '';
    // 根据缓存做一些相关的业务处理
    return '';
  }
  const authUrl = await wechatAuth.authForRabbit(SNSAPI_USERINFO);
  return authUrl;
}
```
3. 得到微信认证url，跳转到微信认证
4. 点击认证后， 后端处理，并给回调地址增加token
```js
router.get(
  '/api/wechatAuthCallback',
  catchError(async (req, res, next) => {
    const { token, wsId, entryUrl, error } = req.query as CallbackQueryModel;
    const session = req.session as ISession;
    let url = getEntryUrl(req, entryUrl);
    try {
      if (!token) return throwNoTokenError();
      if (error) return throwAuthError(error);
      const userInfo = await workwechatAuth.getUserInfoByToken(token);
      const parseUrl = qs.parse(url.split('?')[1]);
      const unionid = userInfo.unionid;
      const userId = parseUrl.userId + '';
      const orgId = parseUrl.orgId + '';
      await workwechat.saveWorkUserRelation(unionid, userId, orgId);
      await workwechatAuth.setRedisData(session, wsId, 'unionid', unionid);
      url = url + '&login=1';
    } catch (e) {
      setNoAuthCookie(res);
    }
    redirectToEntryUrl(res, url); // res.redirect(url);

  })
);
```

5. 根据token获取到用户信息（包含unionid等）
6. 设置redis缓存
7. 做业务处理
8. 返回入口url