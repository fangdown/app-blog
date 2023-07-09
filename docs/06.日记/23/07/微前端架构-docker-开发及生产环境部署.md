# 微前端架构-docker-开发及生产环境部署

## 开发环境

1. （主应用）子应用注册

```
{
    name: 'form-rule',
    entry: process.env.REACT_APP_SUB_FORM_RULE,
    activeRule: '/form-rule',
    container: '#subapp-viewport',
}

```

2. （主应用）环境配置

```
REACT_APP_SUB_FORM_RULE=//127.0.0.1:12003
```

3. （子应用）子应用前缀

- 这里的 form-rule 要和主应用路由匹配

```
<Router basename={window.__POWERED_BY_QIANKUN__ ? "/form-rule" : "/"}>
```

## 生成环境

1. 子应用注册

```
{
    name: 'form-rule',
    entry: process.env.REACT_APP_SUB_FORM_RULE,
    activeRule: '/form-rule',
    container: '#subapp-viewport',
}

```

2. 环境配置

```
REACT_APP_SUB_FORM_RULE=/micro-form-rule/
```

3. （子应用）子应用前缀

- 这里的 form-rule 要和主应用路由 activeRule 匹配

```
<Router basename={window.__POWERED_BY_QIANKUN__ ? "/form-rule" : "/"}>
```

4. （子应用）子应用 webpack

```
const addPublicPath = () => (config) => {
  config.output.publicPath = "/micro-form-rule/";
  return config;
};
```

5. （主应用） nginx 转发

```
  location /micro-form-rule {
    proxy_pass http://localhost:12003;
    proxy_set_header   Host    $host;
    proxy_set_header   X-Real-IP   $remote_addr;
    proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
  }
```

6. （子应用） Dockerfile 文件

```
# nginx默认目录下需要能看见index.html文件
COPY --from=builder code/build /usr/share/nginx/html/micro-form-rule
COPY --from=builder code/build/index.html /usr/share/nginx/html/index.html
```
