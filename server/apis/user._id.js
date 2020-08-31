
const body = require('../tools/bodyPack')

module.exports = {
    get(req,res){
        res.json(body({
            userId: req.params.id
        }))
    }
}