/**
 *  @Author     :   ruanchuhao
 *  @Date       :   2022/7/22
 *  @Name       :   baseError.js
 *  @Content    :   ruanchuhao@shgbit.com
 *  @Desc       :
 */

'use strict';

/**
 *
 * {
 *     code: 1000010  // 业务报错代码
 *     errorMsg: "error ${a} need ${b}" // 应用内报错信息 模版化
 *     statusCode: 404 // ctx http status code
 *     msg: "${c} error ${d} is needed" // 用户返回报错
 * }
 */

const _ = require('lodash');

class EggError {

    /**
     * error 基类
     * @param code
     * @param errorMsg
     * @param statusCode
     * @param msg
     * @param logName
     */
    constructor(code, errorMsg, statusCode, msg, logName) {
        this.code = code;
        this.errorMsg = errorMsg;
        this.statusCode = statusCode;
        this.msg = msg;
        this.logName = logName;
    }

    /**
     * 错误信息处理  TODO 实现
     * @param ctx
     */
    outputError(ctx) {
        console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
        console.log(ctx);
        console.log(this);
        console.log("--------------------------------------------------------------------")
    }

}

module.exports = EggError
