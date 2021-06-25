/**
 * @description user controller
 */

const { getUserInfo, createUser } = require('../services/user')
const { doCrypto } = require('../utils/cryp')
const { SucessModel, ErrorModel } = require('../model/ResModel')
const { registerUserNameNotExistInfo, registerUserNameExistInfo, registerFailInfo } = require('../model/ErrorInfo')
/**
 * 用户名是否存在
 * @param {string} userName
 */
async function isExist(userName) {
    const userInfo = await getUserInfo(userName)
    if (userInfo) {
        return new SucessModel(userInfo)
    } else {
        return new ErrorModel(registerUserNameNotExistInfo)
    }
}

/**
 *
 * @param {string} userName
 * @param {string} passWord
 * @param {string} gender 性别（1男 2女  3未知）
 */

async function register({ userName, passWord, gender, nickName }) {
    const userInfo = await getUserInfo(userName)

    if (userInfo) {
        //用户名已存在
        return new ErrorModel(registerUserNameExistInfo)
    }

    try {
        await createUser({
            userName,
            passWord: doCrypto(passWord),
            gender,
            nickName
        })
        return new SucessModel()
    } catch (error) {
        console.log(error, 'error')
        return new ErrorModel(registerFailInfo)
    }
}

module.exports = {
    isExist,
    register
}
