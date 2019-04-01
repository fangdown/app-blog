## performance统计
- 介绍利用H5 api接口performance，统计网站的加载时间，进而优化加载速度。
- 在做H5项目的时候，首屏加载会是一个比较重要的部分，加载越快，用户流失就会越少
- 受限于网络等原因，可能一些人看到首页较快，一些人看到首页较慢，然后作为程序员却无法准确得知加载慢是因为什么原因造成的，没有办法去细化优化点。
- 幸运的是H5新API接口performance能让我们做的更多一点
```js
window.onload = function(){
    setTimeout(function(){
        with(performance){
            readyStart = timing.fetchStart - timing.navigationStart;
            redirectTime = timing.redirectEnd  - timing.redirectStart;
            appcacheTime = timing.domainLookupStart  - timing.fetchStart;
            unloadEventTime = timing.unloadEventEnd - timing.unloadEventStart;
            lookupDomainTime = timing.domainLookupEnd - timing.domainLookupStart;
            connectTime = timing.connectEnd - timing.connectStart;
            requestTime = timing.responseEnd - timing.requestStart;
            initDomTreeTime = timing.domInteractive - timing.responseEnd;
            domReadyTime = timing.domContentLoadedEventEnd - timing.navigationStart;
            loadTime = timing.loadEventEnd - timing.navigationStart;
             //过早获取时 domComplete有时会是0loadEventTime = timing.loadEventEnd - timing.loadEventStart;loadTime = timing.loadEventEnd - timing.navigationStart;
             //过早获取时 loadEventEnd有时会是0
            console.log('准备新页面时间耗时: ' + readyStart);
            console.log('redirect 重定向耗时: ' + redirectTime);
            console.log('Appcache 耗时: ' + appcacheTime);
            console.log('unload 前文档耗时: ' + unloadEventTime);
            console.log('DNS 查询耗时: ' + lookupDomainTime);
            console.log('TCP连接耗时: ' + connectTime);
            console.log('request请求耗时: ' + requestTime);
            console.log('请求完毕至DOM加载: ' + initDomTreeTime);
            console.log('DOM加载完成: ' + domReadyTime);
            console.log('从开始至load总耗时: ' + loadTime);
        }
    },2000) 
}

```

>通过分析，发现用此方法 DOM加载完成和全部加载完成耗用的时间和chrome浏览器NETWORDK面板上显示的DomContentLoaded 、Load时间基本一致，误差几ms，
>所以我们基本上可以用这个方法来统计我们所做的H5网站在不同地域、不同客户端下加载H5所耗用的时间，进而逐个优化。比如DNS耗时拉 DOM加载耗时了 等等


![](https://upload-images.jianshu.io/upload_images/4023562-f8a53d36883a8483.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/664)