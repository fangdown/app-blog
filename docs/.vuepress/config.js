const env = process.env.NODE_ENV;
module.exports = {

  // 如果你计划发布的站点是在某个仓库下，比如 https://github.com/fangdown/article ，则 base 需要指定为 /article/
  base: '/article/',

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
          '/basis/dataType.md'
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
        ]
      },
      {
        title: '项目经验',
        children: [
          '/experience/url-length.md',          
          '/experience/css-square.md',          
         ]
      },
      {
        title: '框架',
        children: [
          '/framework/react.md',
          '/framework/vue.md',          
          '/framework/vue-point1.md',          
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
          '/optimization/performance.md'
        ]
      },
      {
        title: 'web安全',
        children: [
          '/safe/XSS.md'
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
          '/share/http.md'
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