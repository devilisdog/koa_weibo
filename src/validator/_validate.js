/**
 * @description json schema校验
 */

const Ajv = require('ajv')
const ajv = new Ajv({
    // allError: true //输出所有的错误
})

/**
 *
 * @param {object} schema  json schema校验规则
 * @param {object} data 待校验数据
 */
function validate(schema, data = {}) {
    const result = ajv.validate(schema, data)
    if (!result) {
        return ajv.errors[0]
    }
}

module.exports = validate
