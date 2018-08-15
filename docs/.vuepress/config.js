const env = process.env.NODE_ENV;
module.exports = {

  // 如果你计划发布的站点是在某个仓库下，比如 https://github.com/fangdown/article ，则 base 需要指定为 /article/
  base: '/',

  // 站点标题，在默认主题中会显示在导航栏左侧
  title: '思维发散',

  // 站点描述，将会在 HTML 中渲染为 <meta> 标签，在默认主题中会显示在首页上
  description: '努力前行,温故而知新',

  // 在 <head> 标签中自定义额外标签
  head: [
    ['meta', { httpEquiv:'pragma', content: 'no-cache' }],
    ['meta', { httpEquiv:'Cache-Control', content: 'no-cache' }],
    ['meta', { name: 'keywords', content: '前端基础,前端进阶,思维导图,javascript,react,vue' }],
    ['link', { rel: 'icon', href: `/favicon.ico` }]
  ],

  serviceWorker: env === 'dev' ? false : true,

  // 配置 google 分析统计
  ga: '',

  themeConfig: {
    // repo: '',

    docsDir: 'docs',

    // 禁止提取 h2, h3 标签链接到侧边栏中
    sidebarDepth: 0,

    // nav: [
    //   { text: '组件', link: '/components/agree' }
    // ],

    sidebar: [
      {
        title: '基础',
        collapsable: false,
        children: [
          '/share/interview.md',
          '/basis/dataType.md',
          '/basis/code-literacy.md',
          '/basis/line-clamp.md',
          '/basis/css-level.md',
          '/basis/linux.md',
          '/basis/css-inherit.md',
          '/share/fav-link.md',
        ]
      },
      {
        title: '高级',
        children: [
          '/high/data-check.md',
          '/high/dom.md',
          '/high/array.md',
          '/high/event.md',
          '/high/web-render.md',
          '/high/debounce.md',
          '/high/throttle.md',
          '/high/AO-VO.md',
          '/high/proto.md',
          '/high/scope.md',
          '/high/context.md',
          '/high/this.md',
          '/high/extend.md',
          '/high/param.md',
          '/high/closure.md',
          '/high/deep-copy.md',
          '/high/event-loop.md',
          '/high/cross-domain.md',
          '/high/http-head-param.md',
          '/high/http-head-options.md',
          '/high/http-connect.md',
          '/high/iframe.md',
          '/high/ajax-axios-fetch.md',
        ]
      },
      {
        title: '原理',
        children: [
          '/principle/call-apply-bind.md',
          '/principle/new.md',
          '/principle/typeof-instanceof.md',
          '/principle/lazyload.md',
          '/principle/event-bus.md',
          '/principle/router.md',
          '/principle/defineProperty.md',
          '/principle/virtual-dom.md',
          '/principle/delegate.md',
          '/principle/desin.md',
          '/principle/promise.md',
          '/principle/touch-direction.md',
        ]
      },
      {
        title: '项目经验',
        children: [
          '/experience/url-length.md',          
          '/experience/css-square.md',          
          '/experience/normal-1.md',          
          '/experience/webpack4-css-module.md',          
          '/experience/eslint-rule.md',          
          '/experience/vue-eslint.md',          
          '/experience/less-rem.md',          
          '/experience/package-lock.md',          
          '/experience/fetch-timeout.md',          
          '/experience/wxgzh.md',          
          '/experience/babel-polyfill.md',          
          '/experience/online-debugger.md',          
         ]
      },
      {
        title: '框架',
        children: [
          '/framework/node.md',          
          '/framework/webpack.md',          
          '/framework/webpack-mind.md',          
          '/framework/webpack-plugins.md',          
          '/framework/webpack-dev.md',          
          '/framework/vue-framework.md',          
          '/framework/vue.md',          
          '/framework/vue-life.md',          
          '/framework/vue-nextTick.md',          
          '/framework/vue-point1.md',          
          '/framework/vue-transition.md',          
          '/framework/react-bind.md',
          '/framework/react-life.md',          
          '/framework/react-high-component.md',          
          '/framework/react-diff.md',          
          '/framework/react-mind.md',          
          '/framework/react-redux.md',          
          '/framework/react-fiber.md',          
         ]
      },
      {
        title: '兼容性',
        children: [
          '/compat/1.md',          
         ]
      },
      {
        title: '性能优化',
        children: [
          '/optimization/performance.md',
          '/optimization/react-optimize-tx.md',
          '/optimization/base64.md',
        ]
      },
      {
        title: 'web安全',
        children: [
          '/safe/XSS.md',
          '/safe/http-jiechi.md'
        ]
      },
      {
        title: '新特性',
        children: [ /* ... */ ]
      },
      {
        title: '干货分享',
        children: [
          '/share/git.md',
          '/share/js.md',
          '/share/mvc.md',
          '/share/linux.md',
          '/share/http.md',
          '/share/interview.md',
          '/share/framework.md',
        ]
      },
      {
        title: '挑战点',
        children: [
          '/pains/201805.md'
        ]
      }
    ]
  }
}