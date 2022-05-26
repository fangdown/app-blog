---
title: ossutil上传失败 The specified bucket is not valid.
date: 2022-05-26 16:09:38
permalink: /pages/7b4fd7/
categories:
  - 日记
tags:
  - 
---
# ossutil上传失败
## 背景
利用ossutil工具进行上传的时候提示错误，错误如下"The specified bucket is not valid."
```
Error: oss: service returned error: StatusCode=400, ErrorCode=InvalidBucketName, ErrorMessage="The specified bucket is not valid.", RequestId=628F295C63094636335FF179, File=package.json
```

## 分析
根据官网的提示
```
InvalidBucketName
错误消息：The specified bucket is not valid.
错误原因：Bucket命名不符合规范。
解决方案：检查并确保Bucket命名符合规范。
Bucket命名规范如下：
只包含小写字母、数字和短划线（-）。
以小写字母或者数字开头和结尾。
长度必须在3~63字符之间。

```
仔细检查了 我的bucket命名 ，发现无误，继续寻找解决方法

最终看到一篇类似错误的文章中找到了答案, 问题出在了endpoint上

## 解决
```
除此之外，还遇到了“endpoint 中带有 bucket 名称”时，也会出现上述异常，这个问题博客很多，我就不想写了，解决办法：在 endpoint 中 去除 bucket 名称就可以了；
```

把endpoint 前的bucket名称去掉

```
xxx.oss-cn-shenzhen.aliyuncs.com

改成
oss-cn-shenzhen.aliyuncs.com

```
重新执行ossutil cp 就好了

