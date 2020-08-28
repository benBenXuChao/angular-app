const listCreator = require('../../tools/listCreator')
const body = require('../../tools/bodyPack')
module.exports = {
    get(req, res) {
        const list = listCreator(i => ({ label: `部门${i + 1}`, value: i }), 20)
        res.json(body(list))
    }
}