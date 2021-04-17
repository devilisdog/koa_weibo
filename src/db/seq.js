const Sequelize = require('sequelize')
const { isProd, isTest } = require('../utils/env')

const config = {
    host: 'localhost',
    dialect: 'mysql',
}

if (isTest) {
    config.logging = () => {}
}

//线上环境，使用连接池
if (isProd) {
    config.pool = {
        max: 5, //连接池中最大的连接数量
        min: 0,
        idle: 10000, //如果连接池10s之类没有被使用，则释放
    }
}

const seq = new Sequelize('koa2_weibo_db', 'root', 'password', config)

module.exports = seq
