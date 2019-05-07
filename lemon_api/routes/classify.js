var express = require('express');
var router = express.Router();
var classify = require("./classify_api/index");


/* GET users listing. */
router.post('/api/getClassify', classify.findClass);
router.post('/api/addClassify', classify.addClassify);


module.exports = router;