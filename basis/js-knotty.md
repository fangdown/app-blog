## JS疑难知识点
1. js能够表示整数的范围是正负数的绝对值都不能大于2^53【非科学计数】，也就是正负数的绝对值都不能大于9007199254740992，这个数是16位，超过16位的整数就不能精确表示了。（两个超大数据相加？）
2. <link rel="dns-prefetch" href="www.baidu.com"> <meta http-equiv="x-dns-prefetch-control" content="on"> 现代浏览器中a标签里的连接一般会自动预解析，但是https协议不会，需自己打开注意写法 