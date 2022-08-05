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
     * @param code          业务报错代码
     * @param errorMsg      业务错误报错
     * @param statusCode    ctx http status code return
     * @param msg           ctx 返回错误信息
     * @param logName       业务报错服务tag 如 router|order
     */
    constructor(code, errorMsg, statusCode, msg, logName) {
        this.code = code;
        this.errorMsg = errorMsg;

        this.statusCode = statusCode;
        this.msg = msg;
        this.logName = logName;
    }

    /**
     * 错误信息处理
     * @param ctx
     * @param fill  字段填充
     */
    outputError(ctx, fill) {
        const msg = _.template(this.msg)(fill);
        const errorMsg = `[${this.logName}] [${this.code}] ${_.template(this.errorMsg)(fill)}`;

        ctx.logger.error(errorMsg)

        return {throw: ()=>{ctx.throw(this.statusCode || 500, msg)}}
    }

}

module.exports = EggError
