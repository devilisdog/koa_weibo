const router = require('koa-router')()
const jsonwebtoken = require('jsonwebtoken')
const { SECRET } = require('../../config/constants')
const util = require('util')
const { isExist } = require('../../controller/user')
const verify = util.promisify(jsonwebtoken.verify)

router.prefix('/api/user')

//注册路由
router.post('/register', async (ctx, next) => {
    ctx.body = 'this is a users response!'
})

//用户名是否存在路由
router.post('/isExist', async (ctx, next) => {
    const { userName } = ctx.body.body
    ctx.body = await isExist(userName)
})

//模拟登陆
// router.post('/login', async (ctx, next) => {
//     const { userName, passWord } = ctx.request.body

//     let userInfo

//     if (userName === 'zhangsan' && passWord === 'abc') {
//         userInfo = {
//             userId: 1,
//             userName: 'zhansan',
//             nickName: '三三',
//             gender: 1
//         }
//     }

//     //加密 userinfo
//     let token
//     if (userInfo) {
//         token = jsonwebtoken.sign(userInfo, SECRET, { expiresIn: '1h' })
//     }

//     if (userInfo == null) {
//         ctx.body = {
//             error: -1,
//             msg: '登陆失败'
//         }
//         return
//     }

//     ctx.body = {
//         error: 0,
//         data: token
//     }
// })

//获取用户信息
// router.get('/getUserInfo', async (ctx, next) => {
//     const token = ctx.header.authorization
//     try {
//         const payload = await verify(token.split(' ')[1], SECRET)

//         ctx.body = {
//             error: 0,
//             userInfon: payload
//         }
//     } catch (error) {
//         ctx.body = {
//             error: -1,
//             userInfon: 'verify token failed'
//         }
//     }
// })

module.exports = router
