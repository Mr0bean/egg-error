# egg-error

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-error.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-error
[travis-image]: https://img.shields.io/travis/eggjs/egg-error.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-error
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-error.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-error?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-error.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-error
[snyk-image]: https://snyk.io/test/npm/egg-error/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-error
[download-image]: https://img.shields.io/npm/dm/egg-error.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-error

<!--
Description here.
-->

## 依赖说明

### 依赖的 egg 版本

egg-error 版本 | egg 1.x
--- | ---
1.x | 😁
0.x | ❌

### 依赖的插件
<!--

如果有依赖其它插件，请在这里特别说明。如

- security
- multipart

-->

## 开启插件

```js
// config/plugin.js
exports.error = {
  enable: true,
  package: 'egg-error',
};
```

## 使用场景

- Why: 
  - 因为业务场景下，报错信息不完整，缺失，个性丰富，所以萌生了此项目。
  - 将爆破错信息收口至同一场景，统一约定统一入口，同时要体现约定而非配置。
- and What: 
  - 有统一的配置，在 app/error/ 文件夹下统一配置
  - 使用时，在service层绑定在ctx下直接使用

- How: 
  - 配置错误信息：
  ```javascript
    // app/error/order/demo.js
    // @param {number} code          业务报错代码
    // @param {string} errorMsg      业务错误报错
    // @param {number} statusCode    ctx http status code return
    // @param {string} msg           ctx 返回错误信息
    // @param {function} after         事后处理 ctx, eggError(错误配置信息)
    module.exports.testError = {
             code: "100010",
             errorMsg: "这里是业务${business}报错：${bsMessage}",
             statusCode: "500",
             msg: "不好意思。${userErrorType}，请重试${business}",
             after: (ctx, eggError) =>{....}
    }
  ```
  - 基本使用：
  ```javascript
    class HomeController extends Controller {
    async index() {
        const {ctx} = this;
        const error = ctx.error.order.demo.testError({
            business: "预定", bsMessage: "JSON Invalid", userErrorType: "提交数据不完整"
        });
  ```
  输出
  ```javascript
  >>> 2022-08-05 15:58:35,059 ERROR 17395 [-/127.0.0.1/-/16ms GET /] [order|demo] [100010] 这里是业务预定报错：JSON Invalid
  
  ```
  - 返回的error结构
    - afterResult {any}
      ```javascript
        // after {optional function} 配置返回的结果
        error.afterResult 
      ```
    - throw {function}
      ```javascript
        // 可以抛出异常，使用的是 ctx.throw
        error.throw();
      ```
      - 输出
      ```javascript
        2022-08-05 16:06:05,037 ERROR 18145 [-/127.0.0.1/-/20ms GET /] nodejs.InternalServerError: 不好意思。提交数据不完整，请重试预定
         at Object.throw (/Users/xx/Documents/Codes/js/demoeggorder/node_modules/koa/lib/context.js:97:11)
         at Object.throw (/Users/xx/Documents/Codes/js/demoeggorder/node_modules/egg-error/lib/baseError.js:53:38)
         at HomeController.index (/Users/xx/Documents/Codes/js/demoeggorder/app/controller/home.js:13:16)
         at Object.callFn (/Users/xx/Documents/Codes/js/demoeggorder/node_modules/egg-core/lib/utils/index.js:44:21)
         at Object.classControllerMiddleware (/Users/xx/Documents/Codes/js/demoeggorder/node_modules/egg-core/lib/loader/mixin/controller.js:87:20)
         at Object.callFn (/Users/xx/Documents/Codes/js/demoeggorder/node_modules/@eggjs/router/lib/utils.js:12:21)
         at wrappedController (/Users/xx/Documents/Codes/js/demoeggorder/node_modules/@eggjs/router/lib/egg_router.js:322:18)
         at dispatch (/Users/xx/Documents/Codes/js/demoeggorder/node_modules/koa-compose/index.js:44:32)
         at next (/Users/xx/Documents/Codes/js/demoeggorder/node_modules/koa-compose/index.js:45:18)
         at /Users/xx/Documents/Codes/js/demoeggorder/node_modules/@eggjs/router/lib/router.js:186:18
        message: "不好意思。提交数据不完整，请重试预定"
        pid: 18145
        hostname: MacBook-Pro.local



      ```
      



## 详细配置 （无）

[//]: # (请到 [config/config.default.js]&#40;config/config.default.js&#41; 查看详细配置项说明。)

## 单元测试（无）

[//]: # (<!-- 描述如何在单元测试中使用此插件，例如 schedule 如何触发。无则省略。-->)

## 提问交流

请到 [egg issues](https://github.com/eggjs/egg/issues) 异步交流。

## License

[MIT](LICENSE)
