/**
 * @description 数据格式化
 */

function _formatUserPicture(obj) {
    if (obj.picture == null) {
        obj.picture = 'http://img.qqkuzu.com/uploads/5u317983556b1872392889c26.jpg'
    }
    return obj
}

/**
 *
 * @param {Array|Object} list 用户列表单个或多个对象
 * @returns
 */
function formatUser(list) {
    if ((list = null)) {
        return list
    }
    if (list instanceof Array) {
        //数组 用户列表
        return list.map(_formatUserPicture)
    }
    //单个对象
    return _formatUserPicture(list)
}
