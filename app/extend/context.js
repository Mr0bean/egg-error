/**
 *  @Author     :   ruanchuhao
 *  @Date       :   2022/8/4
 *  @Name       :   context.js
 *  @Content    :   ruanchuhao@shgbit.com
 *  @Desc       :   error 对 Context的扩展， 在每次ctx中都可以用 ctx.error.xxx() 初始化 EggError
 */

'use strict';
const EggError = require('../../lib/baseError');

/**
 * 递归到最深处，拿EggError
 * @param fun 可能的EggError初始化路径
 * @param ctx 当前context指针
 * @returns {*} 最终EggError
 */
function findErrorFunction(fun, ctx){
    return new Proxy(fun,{
        get(targetObj, propoty){
            if (targetObj[propoty] instanceof EggError){
                targetObj[propoty].outputError(ctx);
            }else {
                return findErrorFunction(targetObj[propoty], ctx);
            }
        }
    })
}

module.exports={
    get error(){
        console.log(this)
        return findErrorFunction(this.errorConfigs, this)
    }
}
