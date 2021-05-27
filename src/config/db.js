/**
 * @description 存储配置
 * @author
 */
const { isProd } = require('../utils/env')

const REDIS_CONFIG = {
    port: 6479,
    host: '127.0.0.1'
}

if (isProd) {
    REDIS_CONFIG = {
        //线上redis配置
        // port: 6479,
        // host: '127.0.0.1'
    }
}

module.exports = {
    REDIS_CONFIG
}
