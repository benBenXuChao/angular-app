const { METHOD_TYPE } = require('../config/base')
module.exports = router => (routePath, fileName) => {

    const handler = require(fileName)

    for(let k in handler){
        if(METHOD_TYPE.indexOf(k) !== -1){
            router[k](`/${routePath}`,handler[k])
        }
    }

}