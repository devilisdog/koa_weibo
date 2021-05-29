const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const jwtKoa = require('koa-jwt')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const { REDIS_CONFIG } = require('./config/db')

//路由
const index = require('./routes/index')
const userApiRouter = require('./routes/api/users')
const error = require('./routes/error')

const { SECRET } = require('./config/db')

// error handler
onerror(app)

// app.use(
//     jwtKoa({ secret: SECRET }).unless({
//         path: [/^\/users\/login/] //自定义哪些接口目录忽略jwt验证  没有权限会返回401
//     })
// )

app.keys = [SECRET]
app.use(
    session({
        key: 'weibo.sid', //cookie name 默认“koa.sid”
        prefix: 'weibo:sess:', //redis key 的前缀，默认是 “koa:sess:”
        cookie: {
            path: '/',
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 //单位 ms
        },
        ttl: 24 * 60 * 60 * 1000, //不设置默认与maxAge相同
        store: redisStore({
            all: `${REDIS_CONFIG.host}:${REDIS_CONFIG.port}`
        })
    })
)

// middlewares
app.use(bodyparser({ enableTypes: ['json', 'form', 'text'] }))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(
    views(__dirname + '/views', {
        extension: 'ejs'
    })
)

/**
 * routes
 */
app.use(index.routes(), index.allowedMethods())
app.use(userApiRouter.routes(), userApiRouter.allowedMethods())

//404的路由（“*”）  一定要在注册在最后面
app.use(error.routes(), error.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})

module.exports = app
