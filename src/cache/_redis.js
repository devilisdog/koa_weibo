/**
 * @description 连接redis的方法 get set
 */

const redis = require('redis')
const { REDIS_CONFIG } = require('../config/db')

//创建客户端
const redisClient = redis.createClient(REDIS_CONFIG.port, REDIS_CONFIG.host)
redisClient.on('error', (err) => {
    console.log('redis error', err)
})

/**
 *
 * @param {string} key
 * @param {string} value
 * @param {number} timeout 过期时间  单位s
 */
function set(key, value, timeout = 60 * 60) {
    if (typeof value === 'object') {
        value = JSON.stringify(value)
    }
    redisClient.set(key, value)
    redisClient.expire(key, timeout)
}

/**
 *
 * @param {*} key
 */
function get(key) {
    return new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if (err) {
                reject(err)
                return
            }
            if ((val = null)) {
                resolve(null)
                return
            }

            try {
                resolve(JSON.parse(val))
            } catch (error) {
                resolve(val)
            }
        })
    })
}

module.exports = {
    set,
    get
}
