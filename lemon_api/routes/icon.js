var express = require('express');
var router = express.Router();
var icon = require("./icon_api/index");


/* GET users listing. */
router.get("/api/iconlist", icon.findIcon);

module.exports = router;