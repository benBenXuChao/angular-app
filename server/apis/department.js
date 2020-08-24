const listCreator = require('../tools/listCreator')
const body = require('../tools/bodyPack')
module.exports = function (router) {
    const url = '/department'

    router.get(url, (req, res) => {
        const list = listCreator(i => ({
            id: i,
            deptName: `部门${i + 1}`,
            parentNum: parseInt(Math.random() * 1000) % 100
        }), 10)

        res.json(body({
            total: 20,
            list
        }))
    })

    router.get(url + '/option', (req, res) => {
        const list = listCreator(i => ({ label: `部门${i + 1}`, value: i }), 20)
        res.json(body(list))
    })

    router.post(url, (req, res) => {
        res.json(body())
    })
    
    router.put(url, (req, res) => {
        res.json(body())
    })
    
    router.delete(url, (req, res) => {
        res.json(body())
    })
}