/**
 * @description  失败信息合集 包活errno message
 */

module.exports = {
    registerFailInfo: {
        errno: 10002,
        message: '注册失败，请重试'
    },

    registerUserNameExistInfo: {
        errno: 10001,
        message: '用户名已存在'
    },

    registerUserNameNotExistInfo: {
        errno: 10003,
        message: '用户名不存在'
    },

    loginFailInfo: {
        errno: 10004,
        message: '注册失败'
    },

    loginCheckFailInfo: {
        errno: 10005,
        message: '未登陆'
    },
    //json schema 校验失败
    jsonSchemaFileInfo: {
        error: 1006,
        message: '数据格式校验错误'
    }
}
