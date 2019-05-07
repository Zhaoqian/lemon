var express = require('express');
var router = express.Router();
var bill = require("./bill_api/index.js");


// 查找账单
router.get("/api/selectBill", bill.getBill);

//新建账单
router.post("/api/addBill", bill.addBill)

//删除账单
router.get("/api/deleteBill", bill.deleteBill)

module.exports = router;