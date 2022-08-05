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
 *     after: (ctx, eggError) =>{}
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
     * @param after         事后处理
     * @param logName       业务报错服务tag 如 router|order
     */
    constructor(code, errorMsg, statusCode, msg, after, logName) {
        this.code = code;
        this.errorMsg = errorMsg;

        this.statusCode = statusCode;
        this.msg = msg;

        this.after = after;

        this.logName = logName;
    }

    /**
     * 错误信息处理
     * @param ctx   透明填充context
     * @param fill  字段填充
     */
    outputError(ctx, fill) {
        // 填充报错字段
        const msg = _.template(this.msg)(fill);
        const errorMsg = `[${this.logName}] [${this.code}] ${_.template(this.errorMsg)(fill)}`;

        // 输出异常
        ctx.logger.error(errorMsg);

        //
        let afterResult;
        if(typeof this.after === 'function'){
            afterResult = this.after(ctx, this);
        }
        return {afterResult,throw: ()=>{ctx.throw(this.statusCode || 500, msg)}}
    }

}

module.exports = EggError
