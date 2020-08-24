module.exports = function (cb, limit) {
    const list = []
    for (let i = 0; i < limit; i++) {
        list.push(cb(i))
    }
    return list
}