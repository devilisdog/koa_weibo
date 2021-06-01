/**
 * @description user controller
 */

const { getUserInfo, createUser } = require('../services/user')

const { SucessModel, ErrorModel } = require('../model/ResModel')
const { registerUserNameNotExistInfo, registerUserNameExistInfo } = require('../model/ErrorInfo')
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

async function register({ userName, passWord, gender }) {
    const userInfo = await getUserInfo(userName)
    if (userInfo) {
        //用户名已存在
        return ErrorModel(registerUserNameExistInfo)
    }

    try {
        await createUser({
            userName,
            passWord,
            gender
        })
        return new SucessModel()
    } catch (error) {
        console.log(error.message, error.stack)
        return new ErrorModel({
            registerFailInfo
        })
    }
}

module.exports = {
    isExist,
    register
}
