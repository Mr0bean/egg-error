/**
 *  @Author     :   ruanchuhao
 *  @Date       :   2022/7/22
 *  @Name       :   app.js
 *  @Content    :   ruanchuhao@shgbit.com
 *  @Desc       :
 */

'use strict';

const errorLoader = require('./lib/errorLoader');

// 装载入口
module.exports = app => {
  errorLoader(app);
};

