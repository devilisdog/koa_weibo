/**
 * @description user 数据格式校验
 */

const validate = require('./_validate')

const SCHEMA = {
    type: 'object',
    properties: {
        userName: {
            type: 'string',
            pattern: '^[a-zA-Z][a-zA-Z0-9_]+$', //字母开头，字母数字下划线
            maxLength: 255,
            minLength: 2
        },
        passWord: {
            type: 'string',
            maxLength: 255,
            minLength: 8
        },
        newPasword: {
            type: 'string',
            maxLength: 255,
            minLength: 8
        },
        nickName: {
            type: 'string',
            maxLength: 255,
            minLength: 1
        },
        city: {
            type: 'string',
            maxLength: 255,
            minLength: 2
        },
        gender: {
            type: 'number',
            minimum: 1,
            maximum: 3
        }
    }
}

//执行校验
function userValidate(data = {}) {
    console.log(validate(SCHEMA, data), 'data')
    return validate(SCHEMA, data)
}

module.exports = userValidate
