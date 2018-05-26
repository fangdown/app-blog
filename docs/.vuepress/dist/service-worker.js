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
    "url": "201805/test.html",
    "revision": "3319cb81253d742235b97b00c95c754b"
  },
  {
    "url": "404.html",
    "revision": "9657a477df1009fec1fe681c9602a3d7"
  },
  {
    "url": "assets/css/11.styles.aaf48a63.css",
    "revision": "7c89040e33294b62d84a0c4f3e3103ac"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/0.23579579.js",
    "revision": "2867547a95d82b53dce19464bc734c5d"
  },
  {
    "url": "assets/js/1.cc36312f.js",
    "revision": "1d2362f9f64c76e5095267e50c610469"
  },
  {
    "url": "assets/js/10.140fd4e7.js",
    "revision": "5aaf12c0a22db7c62c74b82ed5c6cda1"
  },
  {
    "url": "assets/js/2.6405454b.js",
    "revision": "5c18e3e7b7c72966d7cad8186bdf2f0c"
  },
  {
    "url": "assets/js/3.d032ead2.js",
    "revision": "b8468b7f7fa27554e7355478f7b290ef"
  },
  {
    "url": "assets/js/4.694f4685.js",
    "revision": "dd92b8aeadc4252bf6c8a8e8ef7bd38b"
  },
  {
    "url": "assets/js/5.5683f6a5.js",
    "revision": "094613bb3fec7f6a534a4205ed513862"
  },
  {
    "url": "assets/js/6.2e95aba3.js",
    "revision": "529f5232603219bf77af6a2e81116629"
  },
  {
    "url": "assets/js/7.ece37c43.js",
    "revision": "9cd430ea250f0d79da40952614da2967"
  },
  {
    "url": "assets/js/8.5e9e1787.js",
    "revision": "72d1ccb1a79068f89519ea397f521110"
  },
  {
    "url": "assets/js/9.3c373035.js",
    "revision": "3ef3db90e9c69ce1b757a200d319bbc0"
  },
  {
    "url": "assets/js/app.5cc48383.js",
    "revision": "58327c577a089f241c5df17a5e1b7f30"
  },
  {
    "url": "basis/dataType.html",
    "revision": "826368c53e74838a9744ec365e956407"
  },
  {
    "url": "basis/test.html",
    "revision": "3d0399320f457b784dba2abdc97b464d"
  },
  {
    "url": "contact.html",
    "revision": "3934a5bbdf4279abf336845f207cade6"
  },
  {
    "url": "index.html",
    "revision": "c3cbb359fb4d4f2d684f05eaed6cb2d0"
  },
  {
    "url": "page-a.html",
    "revision": "4a41b858996b0865f15d15a0d54214ad"
  },
  {
    "url": "page-b.html",
    "revision": "3895200538539063b1571262a71b3b1a"
  },
  {
    "url": "pains/201805.html",
    "revision": "b1ef6edf9e6fc703195b103f2358e030"
  },
  {
    "url": "share/git.html",
    "revision": "b5acb447ddac6b953625ea0ca7ae56b9"
  },
  {
    "url": "share/js.html",
    "revision": "800db845f385768348f84d9703bc0fd3"
  },
  {
    "url": "share/mvc.html",
    "revision": "f3315eb55f0c259efff83c04b1901ff5"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
