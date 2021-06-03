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
        userName
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
    // console.log(result.dataValues, 'result.dataValues')

    //格式化处理
    // const formatRes = formatUser(result.dataValues)

    return result.dataValues
}

/**
 * 创建用户
 * @param {string} userName
 * @param {string} passWord
 * @param {number} gender
 * @param {string} nickName
 */
async function createUser({ userName, passWord, gender = 3, nickName }) {
    const result = await User.create({
        userName,
        passWord,
        nickName,
        gender
    })

    return result.dataValues
}

module.exports = { getUserInfo, createUser }
