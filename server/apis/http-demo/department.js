const listCreator = require('../../tools/listCreator')
const body = require('../../tools/bodyPack')
module.exports = {
    get(req, res) {
        console.log(req.query);
        const list = listCreator(i => ({
            id: i,
            deptName: `部门${i + 1}`,
            parentNum: parseInt(Math.random() * 1000) % 100
        }), 10)

        res.json(body({
            total: 20,
            list
        }))
    },
    post(req,res){
        res.json(body())
    },
    put(req,res){
        res.json(body())
    },
    delete(req,res){
        res.json(body())
    },
}