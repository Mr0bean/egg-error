/**
 *  @Author     :   ruanchuhao
 *  @Date       :   2022/8/4
 *  @Name       :   errorLoader.js
 *  @Content    :   ruanchuhao@shgbit.com
 *  @Desc       :   装载error的实现  装载点  app.context.errorConfigs ==》原始配置  app.context.error=》每次生成，配置是单例
 */

'use strict';

const path = require('path');
const EggError = require('./baseError');

const ERROR_DIR_PATH = 'app/error';

/**
 * 每个fileLoader的 initializer
 * @param {Object} originErrorConfig  读取配置
 * @param {Object} _path              读取路径
 * @return {*} 装载好的方法
 * @private
 */
const _init = (originErrorConfig, _path) => {
  const logName = _path.pathName.slice(6).replace('.', '|');

  for (const eachName of Object.keys(originErrorConfig)) {
    console.log(eachName);
    originErrorConfig[eachName] = new EggError(
      originErrorConfig[eachName].code,
      originErrorConfig[eachName].errorMsg,
      originErrorConfig[eachName].statusCode,
      originErrorConfig[eachName].msg,
      originErrorConfig[eachName].after,
      logName
    );
  }
  return originErrorConfig;
};


module.exports = app => {
  app.context.errorConfigs = new app.loader.FileLoader({
    directory: path.join(app.baseDir, ERROR_DIR_PATH),
    target: {},
    inject: app,
    call: true,
    initializer: _init,
  }).load();
};
