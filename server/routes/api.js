var express = require('express');
var router = express.Router();
var getRoute = require('../tools/getRoute')
const path = require('path')
const mountRoute = require('../tools/mountRoute')

/**
 * 装载路由,自动加载和读取apis目录下的文件并生成相应接口
 */
getRoute(path.join(__dirname, '../apis'), mountRoute(router))


module.exports = router;
