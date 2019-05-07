var express = require('express');
var router = express.Router();
var user = require("./user_api/index.js")

/* GET users listing. */
router.post('/userlist', user.userlist);

module.exports = router;