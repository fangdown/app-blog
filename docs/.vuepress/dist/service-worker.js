/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "1433524102cd2b6e110ad724029b0b48"
  },
  {
    "url": "assets/css/10.styles.d1670ff5.css",
    "revision": "7c89040e33294b62d84a0c4f3e3103ac"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/img/XSS.47debbd2.png",
    "revision": "47debbd20bbaed7eeb295f6a75f4b0a6"
  },
  {
    "url": "assets/js/0.4f6b5769.js",
    "revision": "ad58756eb3c88a1dde3c7937e6cca1b9"
  },
  {
    "url": "assets/js/1.cfed38a5.js",
    "revision": "acd98340155c53f5fbff9612d6af6da5"
  },
  {
    "url": "assets/js/2.b0ca108a.js",
    "revision": "6420cc0135b63f8ff1b26324e61e4578"
  },
  {
    "url": "assets/js/3.fc2e5020.js",
    "revision": "70725637f097775b6cf969e3815effc2"
  },
  {
    "url": "assets/js/4.57597d18.js",
    "revision": "bcd86e1fe3795f612e015cf2803ff22c"
  },
  {
    "url": "assets/js/5.07290af3.js",
    "revision": "76686562281761cced49304b11a4189b"
  },
  {
    "url": "assets/js/6.183be6cf.js",
    "revision": "463270a011329e338f82d2bb3d7f5418"
  },
  {
    "url": "assets/js/7.b4bb602e.js",
    "revision": "f703e23f124ace270810f1ea530999d9"
  },
  {
    "url": "assets/js/8.f01d314f.js",
    "revision": "d0ffc93542b6603c4ce085963d1c8917"
  },
  {
    "url": "assets/js/9.b45d3528.js",
    "revision": "3ef3db90e9c69ce1b757a200d319bbc0"
  },
  {
    "url": "assets/js/app.3b64547f.js",
    "revision": "8f500d400a4aecfbbdbb789178b40867"
  },
  {
    "url": "basis/dataType.html",
    "revision": "fd93058f788f5316329d42e0f8f18f6f"
  },
  {
    "url": "high/fine-code-array.html",
    "revision": "fdc73925cdf5765d57168804229d2b46"
  },
  {
    "url": "high/fine-code-check.html",
    "revision": "57001b701b8b389641627d8810c668b5"
  },
  {
    "url": "high/fine-code-dom.html",
    "revision": "aa095730226e857a304f16c104ce9729"
  },
  {
    "url": "index.html",
    "revision": "c8e17b9fdb9ab9d236c2b263f1252e41"
  },
  {
    "url": "pains/201805.html",
    "revision": "8f291884990b3b218af2f653c8429d4d"
  },
  {
    "url": "safe/XSS.html",
    "revision": "b3d5eda353d31f9b391702209b7bfb31"
  },
  {
    "url": "share/git.html",
    "revision": "22e0f4790bd79ce04915da7b4a55d104"
  },
  {
    "url": "share/js.html",
    "revision": "ea102d4105f2c4a4eb259428973004a9"
  },
  {
    "url": "share/mvc.html",
    "revision": "e6d8c26a4dc7715bf799f0d317fe5778"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
