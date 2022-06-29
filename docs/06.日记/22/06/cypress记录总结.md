---
title: cypress记录总结
date: 2022-06-21 14:11:11
permalink: /pages/4b8e4c/
categories:
  - 日记
tags:
  - cypress
---

# cypress记录总结&指南

## 什么是 Cypress

一个前端测试工具

## 安装/初始化
1. 安装： 
```
yarn add cypress --dev
```
2. 启动
```
"scripts": {
    "cypress:open": "npx cypress open",
    "cypress:run": "npx cypress run --reporter mochawesome"
  }
```

## 文件结构
> 可以和项目文件分开,也可以放在一起
*   **/cypress**
    *   **/fixtures** （mock 数据）
        *   example.json
    *   **/integration** （测试文件）
        *   **/examples**
            *   example.spec.js （一般格式为 `*.spec.js`）
    *   **/plugins** 系统插件
        *   index.js
    *   **/support**  命令
        *   commands.js
        *   index.js
    *   /screenshots （默认截屏文件夹）
*   **cypress.json**

## 代码示例
```
    ///  <reference types="cypress" />

    Cypress.on("uncaught:exception", (err, runnable) => {
        return false;
    });
    describe('描述', () => {
      before(() => console.log('---- Test Start! ----'));
      beforeEach(() => cy.visit('https://witch.url'));
      afterEach(() => cy.clearCookies());
    
      it('测试用户交互', () => {
        cy.get('#app').children('.intro').click();
        cy.contains('Welcome').should('be.exist');
      });
    
      it('测试显示文本', () => {
        cy.get('div').should('have.text', 'Hello');
        // * 另一种风格
        cy.get('div').should(($div) => {
          const text = $div.text();
          expect(text).to.match(/hello/i);
        });
      });
    });
```
大致分为几个部分

*   TypeScript 自动完成支持（第一行的注释）
*   运行器和生命周期（`describe`、`it`、`before` 等）
*   元素查找和操作（`cy` 相关命令）
*   断言/测试（`should`、`expect`、`assert` 多种风格）

## Cypress 对象

[`Cypress` 和 `cy` 的区别 (opens new window)](https://docs.cypress.io/api/events/catalog-of-events.html#Cypress)


## 测试/断言

[Cypress 中内置的断言 (opens new window)](https://docs.cypress.io/guides/references/assertions.html) 包含了几种类型：

*   **Chai**：断言
    *   `expect('test').to.be.a('string')`：BDD 风格
    *   `assert.equal(3, 3, 'vals equal')`：TDD 风格
*   **Chai jQuery**：关于 DOM 的断言
    *   `expect(\$el).to.have.attr('foo', 'bar')`
*   **Sinon-Chai**：关于函数调用情况的断言
    *   `expect(spy).to.be.called`
*   **`.should()`**：在 Cypress 中封装了以上所有可用断言
    *   `cy.get('li.selected').should('have.length', 3)`：should
    *   `cy.get('div').should(($div) => { expect($div)... })`：BDD



##  `cy` 命令

用来编写测试

*   测试
    *   `should`：断言
    *   `then`：类似 Promise 的 then
    *   `each`：遍历执行（对于数组）
    *   `spread`：then 的 each 版
*   查询
    *   `contains`、`get`
        *   `children`、`closest`、`find`
        *   `eq`、`filter`、`not`
        *   `first`、`last`
        *   `next`、`nextAll`、`nextUntil`
        *   `parent`、`parents`、`parentsUntil`
        *   `prev`、`prevAll`、`prevUntil`
        *   `siblings`
    *   `window`、`document`、`title`
    *   `its`：取得对象中的字段，如 `cy.get('ul li').its('length')`
    *   `root`：当前上下文的根元素节点
    *   `within`：设定上下文元素（类似 JS 中的 with）
*   操作
    *   用户操作
        *   `click`、`dblclick`、`rightclick`
        *   `blur`、`focus`、`focused`
        *   `hover`：不支持
        *   `trigger`：触发事件
    *   表单/输入框
        *   `check`、`uncheck`、`select`
        *   `clear`：清除文本框
        *   `type`：输入文本框
        *   `submit`
    *   `scrollIntoView`、`scrollTo`
    *   `invoke`：调用对象中的函数，如 `cy.get('div').invoke('show')`
*   浏览器
    *   `viewport`：设置应用窗口大小
    *   `clearCookie`、`clearCookies`、`getCookie`、`getCookies`、`setCookie`
    *   `clearLocalStorage`
*   网络请求
    *   `visit`、`reload`：访问
    *   `hash`、`location`、`url`：获取
    *   `go`：历史跳转，相当于 `window.history.go`
    *   `request`：HTTP 请求
    *   `server`：启动一个服务
    *   `route`：跳转路由
*   功能性
    *   任务
        *   `log`、`debug`、`pause`
        *   `exec`：执行 shell 命令
        *   `readFile`、`writeFile`
        *   `screenshot`：截屏到 `/screenshots`
        *   `fixture`：读取 `/fixtures` 中文件内容
        *   `task`：执行 `/plugins` 中声明的事件
    *   语法糖
        *   `as`：设置为别名
        *   `and`：进行多个测试
        *   `end`：截断当前测试（后续链式调用将重新计算）
        *   `wrap`：包装一个对象（以便支持 cy 命令）
    *   调用监听
        *   `spy`：监听对象中的函数
        *   `stub`：替换对象中的函数（用于监听）
    *   Timer
        *   `clock`：覆写原生时钟（将会影响 setTimeout 等原生函数）
        *   `tick`：跳过时间，加快测试速度（需要先 `cy.clock()`）
        *   `wait`：显式等待（不推荐使用）

## `Cypress` API

包含定制选项方法，或公共静态方法

*   定制
    *   `Commands`：添加自定义命令
    *   `Cookies`：测试时的 Cookie 行为控制
    *   `Screenshot`：截屏参数配置
    *   `SelectorPlayground`：调整选择器规则
    *   `Server`：调整 `cy.server()` 默认参数
    *   `config`：修改 Cypress 的 [配置选项 (opens new window)](https://docs.cypress.io/guides/references/configuration.html)
    *   `env`：管理自定义全局变量
    *   `log`：配置 log 参数
*   辅助
    *   `dom`：一组 dom 相关方法
        *   如 `Cypress.dom.isHidden($el)`
    *   `isCy`：是否是 cy 对象
*   环境信息
    *   `arch`：获取 CPU 架构，来源于 Node `os.arch()`
    *   `browser`：获取浏览器信息
    *   `platform`：获取操作系统名字
    *   `spec`：当前测试文件信息
    *   `version`：版本号

##  事件

事件绑定机制是 [Node Events (opens new window)](https://nodejs.org/api/events.html)，  
用法如：`Cypress.on`/`cy.on`

*   应用（页面）事件
    *   `uncaught:exception`
    *   `window:confirm`、`window:alert`、`window:before:load`、`window:load`、`window:before:unload`、`window:unload`
    *   `url:changed`
*   Cypress 事件
    *   `fail`
    *   `viewport:changed`
    *   `scrolled`
    *   `command:enqueued`、`command:start`、`command:end`、`command:retry`
    *   `log:added`、`log:changed`
    *   `test:before:run`、`test:after:run`

## 参考
[Cypress 学习指南](https://rualc.com/frontend/cypress/#cypress-jian-jie)

[语法命令](https://docs.cypress.io/api/commands/invoke#Syntax)

[Cypress事件赋值清空赋值与断言](https://juejin.cn/post/6933081106619039751)
