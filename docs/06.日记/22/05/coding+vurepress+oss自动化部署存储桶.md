---
title: 爽歪歪，一键提交，coding自动化部署COS，OSS
date: 2022-05-27 11:32:39
permalink: /pages/743ceb/
categories:
  - 日记
tags:
  - coding
---

# 爽歪歪，一键提交，coding自动化部署COS，OSS


## 愿景
你只管写博客，剩下的就给自动化了！！！

在本地写完markdown后，提交到远程github，剩下的就完全```自动化部署```，喝杯茶的功夫，回来就可以看到新鲜的页面了。

## 方案
- 博客：vuepress
- 自动化部署：coding
- 存放文件：腾讯云cos /  阿里oss 

## vuepress

如何通过vuepress构建个人blog就不多描述了，快速入门：[vuepress](https://vuepress.vuejs.org/zh/)


## coding 自动部署
### 初始化自己的团队、项目
- [coding传送门](https://coding.net/)


### 构建计划
- 进入项目
- 点击左侧菜单，持续集成-->构建计划
- 创建构建计划
- 在计划模板中，选择Vue + COS或者 React + COS
- 填写对应的构建信息， 如代码仓库、COS信息
- 确定完成

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1102ce72a94c48eabf94f102e9e5a1e9~tplv-k3u1fbpfcp-watermark.image?)

#### 代码仓库
代码仓库可以选择coding的代码仓库和外部的github仓库， 如果是外部的需要自行绑定一下

#### COS OSS
腾讯的COS，阿里的OSS 类似，需自己开通一下，非常方便

### 构建优化
模板中的初始构建脚本可能不适合我们， 需要稍微优化一下
- 新建环境变量
    - 腾讯COS
        - COS_SECRET_ID
        - COS_SECRET_KEY
        - COS_BUCKET_NAME
        - COS_UPLOAD_FROM_PATH
    - 阿里OSS
        - ACCESS_KEY_ID
        - ACCESS_KEY_SECRET
        - ENDPOINT
#### 腾讯COS 构建
> 因生态优势，默认就可以支持coscmd上传，只需填入相应信息即可

```
pipeline {
  agent any
  stages {
    stage('检出') {
      steps {
        checkout([$class: 'GitSCM',
        branches: [[name: GIT_BUILD_REF]],
        userRemoteConfigs: [[
          url: GIT_REPO_URL,
          credentialsId: CREDENTIALS_ID
        ]]])
      }
    }
    stage('安装依赖') {
      steps {
        sh 'npm install'
      }
    }
    stage('编译') {
      steps {
        sh '''npm run build'''
      }
    }
    stage('上传到 COS Bucket') {
      steps {
        sh "coscmd config -a ${COS_SECRET_ID} -s ${COS_SECRET_KEY} -b ${COS_BUCKET_NAME} -r ${COS_BUCKET_REGION}"
        sh "coscmd upload -r ${COS_UPLOAD_FROM_PATH} /"
        echo "上传成功，访问 https://${COS_BUCKET_NAME}.cos-website.${COS_BUCKET_REGION}.myqcloud.com 预览效果"
        echo "您也可以访问原域名 https://${COS_BUCKET_NAME}.cos.${COS_BUCKET_REGION}.myqcloud.com/index.html 预览效果"
      }
    }
  }
}
```
#### 阿里ali-oss 构建

> 通过ossutil 进行上传， 需先安装通过ossutil再使用脚本命令。

在package.json中增加一条script脚本， 其中```html```为上传目录，```oss://app-blog/```为oss://+ bucket名


```
"ali-oss": "ossutil cp -rf --meta Cache-Control:no-cache html oss://app-blog/ ",
```
```
pipeline {
  agent any
  stages {
    stage('检出') {
      steps {
        checkout([$class: 'GitSCM',
        branches: [[name: GIT_BUILD_REF]],
        userRemoteConfigs: [[
          url: GIT_REPO_URL,
          credentialsId: CREDENTIALS_ID
        ]]])
      }
    }
    stage('安装依赖') {
      steps {
        sh 'npm install'
      }
    }
    stage('编译') {
      steps {
        sh '''npm run build'''
      }
    }
    stage('上传到 COS Bucket') {
      steps {
        sh "wget https://gosspublic.alicdn.com/ossutil/1.7.12/ossutil64 -O /usr/local/bin/ossutil \
        && chmod 755 /usr/local/bin/ossutil \
        && ossutil config -i ${ACCESS_KEY_ID} -k ${ACCESS_KEY_SECRET} -e ${ENDPOINT}"
        sh 'npm run ali-oss'
        echo "上传成功"
      }
    }
  }
}
```



### 自定义域名
在COS、OSS中都有自定义域名绑定， 可以绑定自定义域名，方便在浏览器中进行访问

## 总结
- 本文重点描述了如何coding 构建计划，实现上传构建文件到COS、OSS中， 其中COS方案相对容易， OSS方案需安装软件ossutil配合脚本命令进行上传，补全了OSS方案

- 自动化过程
    - 编写markdown文件，push到远程代码仓库
    - coding构建计划被触发构建
    - 上传构建文件到COS/OSS
    - 页面更新

- 本文以简单的vuepress为例，实际前端项目部署也比较类似，大家可参考。