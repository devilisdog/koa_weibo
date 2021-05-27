const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const jwtKoa = require('koa-jwt')

const index = require('./routes/index')
const users = require('./routes/users')
const error = require('./routes/error')

const { SECRET } = require('./config/constants')

// error handler
onerror(app)

app.use(
    jwtKoa({ secret: SECRET }).unless({
        path: [/^\/users\/login/] //自定义哪些接口目录忽略jwt验证  没有权限会返回401
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
app.use(users.routes(), users.allowedMethods())

//404的路由（“*”）  一定要在注册在最后面
app.use(error.routes(), error.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})

module.exports = app
