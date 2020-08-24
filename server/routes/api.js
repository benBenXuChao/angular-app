var express = require('express');
var router = express.Router();
var departmentHandler = require('../apis/department')
var userHandler = require('../apis/user')

departmentHandler(router);
userHandler(router);


module.exports = router;
