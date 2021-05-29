/**
 * @description user services
 */

const { User } = require('../db/model/index')
const { formatUser } = require('./_format')

/**
 * 获取用户信息
 * @param {string} userName
 * @param {string} passWord
 */
async function getUserInfo(userName, passWord) {
    //查询条件
    const whereOpt = {
        uerName
    }
    if (passWord) {
        Object.assign(whereOpt, { passWord })
    }
    //查询
    const result = await User.findOne({
        attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
        where: whereOpt
    })
    if (result == null) {
        return result
    }

    //格式化处理
    const formatRes = formatUser(result.dataValues)
    return formatRes
}

module.exports = { getUserInfo }