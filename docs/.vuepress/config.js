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
          '/basis/dataType.md',
          '/basis/code-literacy.md',
          '/basis/fav-link.md',
          '/basis/fav-blog.md',
          '/basis/js-knotty.md',
        ]
      },
      {
        title: '高级',
        children: [
          '/high/data-check.md',
          '/high/algorithm.md',
          '/high/canvas.md',
          '/high/array.md',
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
          '/high/iframe.md',
          '/high/ajax-axios-fetch.md',
          '/high/async-js.md',
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
        title: 'css',
        children: [
          '/css/css-inherit.md',
          '/css/css-level.md',
          '/css/css-square.md',
          '/css/less-rem.md',
          '/css/line-clamp.md',
          '/css/vertial-middle.md',
        ]
      },
      {
        title: '浏览器',
        children: [
          '/browser/http2.md',
          '/browser/http-head-param.md',
          '/browser/http-head-options.md',
          '/browser/http-connect.md',
          '/browser/http-cache.md',
          '/browser/cross-domain.md',
          '/browser/web-render.md',
          '/browser/event.md',
          '/browser/event-loop.md',
          '/browser/dom.md',
        ]
      },
      {
        title: '项目经验',
        children: [
          '/experience/compat.md',              
          '/experience/url-length.md',              
          '/experience/normal-1.md',          
          '/experience/fetch-timeout.md',          
          '/experience/wxgzh.md',          
          '/experience/babel-polyfill.md',          
          '/experience/online-debugger.md',          
         ]
      },
      {
        title: 'react',
        children: [
          '/react/react-bind.md',
          '/react/react-life.md',          
          '/react/react-high-component.md',          
          '/react/react-diff.md',          
          '/react/react-mind.md',          
          '/react/react-redux.md',          
          '/react/react-fiber.md',    
        ]
      },
      {
        title: 'vue',
        children: [
          '/vue/vue-eslint.md',
          '/vue/vue-framework.md',          
          '/vue/vue.md',          
          '/vue/vue-life.md',          
          '/vue/vue-nextTick.md',          
          '/vue/vue-point1.md',          
          '/vue/vue-transition.md',         
        ]
      },
      {
        title: 'nodejs',
        children: [
          '/node/node.md',          
        ]
      },
      {
        title: 'webpack',
        children: [
          '/webpack/webpack4-css-module.md',    
          '/webpack/package-lock.md',          
          '/webpack/package.md',          
          '/webpack/eslint-rule.md',     
          '/webpack/webpack.md',          
          '/webpack/webpack-mind.md',          
          '/webpack/webpack-plugins.md',          
          '/webpack/webpack-dev.md',               
          '/webpack/loader.md',               
        ]
      },
      {
        title: '性能优化',
        children: [
          '/optimization/performance.md',
          '/optimization/react-optimize-tx.md',
          '/optimization/base64.md',
          '/optimization/webpack-splitChunks.md',
          '/optimization/etag.md',
          '/optimization/cdn.md',
          '/optimization/dns-prefetch.md',
          '/optimization/common.md',
          '/optimization/much-domain.md',
          '/optimization/cookie.md',
          '/optimization/css-block.md',
          '/optimization/js-block.md',
          '/optimization/js-common.md',
          '/optimization/reflow-repaint.md',
        ]
      },
      {
        title: 'web安全',
        children: [
          '/safe/common.md',
          '/safe/http-jiechi.md',
          '/safe/interface.md'
        ]
      },
      {
        title: '算法',
        children: [
          '/arithmetic/binarySearch.md',          
          '/arithmetic/quickSort.md',          
          '/arithmetic/binaryTreeMinDept.md',          
        ]
      },
      {
        title: '协作',
        children: [
          '/team/git.md',          
        ]
      },
      {
        title: '后端',
        children: [
          '/server/linux.md',
        ]
      },
      {
        title: '练习',
        children: [
          '/training/soulSoother.md',
          '/training/target.md',
          '/training/question.md',
          '/training/training-1.md'
        ]
      }
    ]
  }
}