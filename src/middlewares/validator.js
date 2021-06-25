const { ErrorModel } = require('../model/ResModel')
const { jsonSchemaFileInfo } = require('../model/ErrorInfo')

/**
 * @description  生成 json schema 验证中间件
 * @param {function} validateFun 验证函数
 */

function genValidator(validateFun) {
    //定义中间件函数
    async function validator(ctx, next) {
        const data = ctx.request.body
        const error = validateFun(data)
        if (error) {
            //验证失败
            ctx.body = new ErrorModel(jsonSchemaFileInfo)
            return
        }
        //验证成功
        await next()
    }
    //返回中间件
    return validator
}

module.exports = {
    genValidator
}
