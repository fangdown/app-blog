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
    ['meta', { httpEquiv: 'pragma', content: 'no-cache' }],
    ['meta', { httpEquiv: 'Cache-Control', content: 'no-cache' }],
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
        title: 'typescript',
        collapsable: false,
        children: [
          '/typescript/type-in-work.md',
          '/typescript/basic.md',
        ]
      },
      {
        title: '架构设计',
        collapsable: false,
        children: [
          '/framework/react-redux-1.md',
          '/framework/node-middleware-1.md',
        ]
      },
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
          '/high/modules.md',
          '/high/proxy.md',
          '/high/v8-gc.md',
        ]
      },
      {
        title: '手写代码',
        children: [
          '/code/single-mode.md',
          '/code/node-set-cdn-file.md',
          '/code/replace-reg.md',
          '/code/rgb.md',
          '/code/canvas.md',
          '/code/mixins.md',
          '/code/vue-component.md',
          '/code/componentIs.md',
          '/code/v-model.md',
          '/code/vue-component.md',
          '/code/sort.md',
          '/code/flat.md',
          '/code/call-apply-bind.md',
          '/code/deepClone.md',
          '/code/isEqual.md',
          '/code/defineProperty.md',
          '/code/proxy.md',
          '/code/currying.md',
          '/code/extend.md',
          '/code/instanceof.md',
          '/code/promise.md',
          '/code/new.md',
          '/code/ajax.md',
          '/code/url-param.md',
          '/code/thousand.md',
        ]
      },
      {
        title: '项目难点',
        collapsable: false,
        children: [
          '/difficultPoint/reactLongList.md',
          '/difficultPoint/html2canvas.md',
          '/difficultPoint/svg2canvas.md'
        ]
      },
      {
        title: '原理',
        children: [
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
          '/css/flex.md',
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
          '/browser/url-render.md',
        ]
      },
      {
        title: '组件封装',
        children: [
          '/package/vue-select.md',
          '/package/react-package.md',
        ]
      },
      {
        title: '项目经验',
        children: [
          '/experience/fiddler-https.md',
          '/experience/compat.md',
          '/experience/url-length.md',
          '/experience/normal-1.md',
          '/experience/fetch-timeout.md',
          '/experience/wxgzh.md',
          '/experience/babel-polyfill.md',
          '/experience/online-debugger.md',
          '/experience/response-attachment.md',
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
          '/vue/vue-all.md',
          '/vue/vue-eslint.md',
          '/vue/vue-framework.md',
          '/vue/vue.md',
          '/vue/vue-life.md',
          '/vue/vue-nextTick.md',
          '/vue/vue-point1.md',
          '/vue/vue-transition.md',
          '/vue/keep-alive.md',
        ]
      },
      {
        title: 'nodejs',
        children: [
          '/node/node-server-js.md',
          '/node/node.md',
          '/node/fs.md',
          '/node/http.md',
          '/node/buffer.md',
          '/node/module.md',
          '/node/koa-mongodb.md',
          '/node/controller.md',
        ]
      },
      {
        title: 'webpack',
        children: [
          '/webpack/source-mult-entry.md',
          '/webpack/source-dev-tool.md',
          '/webpack/source-proxy.md',
          '/webpack/source-variable.md',
          '/webpack/source-bundle.md',
          '/webpack/source-js-loader.md',
          '/webpack/source-css-loader.md',
          '/webpack/source-css-loader.md',
          '/webpack/source-html.md',
          '/webpack/source-image-loader.md',
          '/webpack/source-global-visible.md',
          '/webpack/bundle.md',
          '/webpack/webpack4-css-module.md',
          '/webpack/package-lock.md',
          '/webpack/package.md',
          '/webpack/eslint-rule.md',
          '/webpack/webpack.md',
          '/webpack/webpack-mind.md',
          '/webpack/webpack-plugins.md',
          '/webpack/webpack-dev.md',
          '/webpack/loader.md',
          '/webpack/gulp.md',
          '/webpack/babel.md',
          '/webpack/plugin.md',
        ]
      },
      {
        title: '性能优化',
        children: [
          '/optimization/home.md',
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
          '/optimization/webpack.md',
          '/xiaoce/youhua-webpack.md',
          '/xiaoce/youhua-brower.md',
          '/xiaoce/youhua-image.md',
          '/xiaoce/youhua-cache.md',
          '/xiaoce/youhua-dom.md',
          '/xiaoce/youhua-repaint-flow.md',
          '/xiaoce/youhua-ssr.md',
          '/xiaoce/youhua-cdn.md',
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
          '/team/jmeter.md',
        ]
      },
      {
        title: '后端',
        children: [
          '/server/linux.md',
          '/server/mongodb/mingling.md',
          '/server/mongodb/build.md',
          '/server/mongodb/pm2.md',
          '/server/mongodb/deploy.md',
          '/server/mongodb/job.md',
          '/server/nginx/proxy-pass.md',
          '/server/docker/what-docker.md',
          '/server/docker/why-docker.md',
          '/server/docker/how-docker.md',
        ]
      },
      {
        title: 'M',
        children: [
          '/mqw/mqw-http.md',
          '/mqw/mqw-optimization.md',
          '/mqw/mqw-render-flow.md',
          '/mqw/mqw-safe.md',
          '/mqw/mqw-object.md',
          '/mqw/mqw-mvvm.md',
          '/mqw/mqw-errorView.md',
          '/mqw/mqw-dataType.md',
          '/mqw/mqw-sf.md',
          '/mqw/mqw-myself.md',
          '/mqw/mqw-grouper.md',
          '/mqw/mqw-leader.md',
          '/mqw/mqw-hr.md',
          '/mqw/mqw-all.md',
          '/mqw/mqw-stand.md',
          '/mqw/project.md',
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