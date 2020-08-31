const fs = require('fs')
/**
 * 传入绝对路径,读取相应路径下的所有文件,每当读取到一个文件就执行一次回调函数
 * @param {string} path 需要读取的绝对路径
 * @param {function} callback 回调函数,会接收两个参数,第一个参数代表当前文件对应的接口路径,第二个参数代表当前文件所在路径
 */
function getRoute(path, callback) {
    const target = []
    let res = fs.readdirSync(path)
    res.map(currentPath => {
        getPath(currentPath, path, callback)
    })
    return target
}

function getPath(path, parentPath, callback) {
    const targetPath = `${parentPath}/${path}`
    const isDir = fs.statSync(targetPath).isDirectory()

    if (isDir) { // 是目录
        const child = fs.readdirSync(targetPath)
        child.map(currentPath => getPath(currentPath, targetPath, callback))
    } else { // 是文件
        callback(fileNameHandler(path), targetPath)
    }
}

/**
 * 文件名解析,返回该文件名所代表的方法名称以及对应的路由路径
 * @param {string} path 需要被解析的文件名,用'.'分割,文件必须以.js为结尾,xxx.js和xxx.get.js返回type值为get  xxx.post.js返回type值为post 以此类推,xxx.yyy.js返回路径为xxx/yyy type值为get  xxx.yyy.post.js返回path为xxx/yyy type值为post
 */
function fileNameHandler(path) {
    path = path.trim()
    const target = path.split('.')
    const lastIndex = target.length - 1
    if (target.length <= 1 || target[lastIndex] !== 'js') {
        return null
    }

    return target.slice(0, -1).map((itemPath) => {

        if (/^\_/.test(itemPath)) {
            itemPath = ':' + itemPath.slice(1)
        }
        return itemPath
    }).join('/')
}


module.exports = getRoute