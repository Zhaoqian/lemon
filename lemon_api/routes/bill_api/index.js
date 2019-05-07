var mymongo = require("mymongo1610");

// 查询账单
function getBill(req, res, next) {
    if (!req.query.type) {
        mymongo.find("bill_list", { uid: req.query.uid }, function(err, result) {
            if (err) {
                res.json({ "code": 0, "msg": "服务器错误" })
            } else {
                res.json({ "code": 1, "msg": result })
            }
        })
    } else {
        var reg = new RegExp(req.query.type);
        mymongo.find("bill_list", { uid: req.query.uid, timer: reg }, function(err, result) {
            if (err) {
                res.json({ "code": 0, "msg": "服务器错误" })
            } else {
                res.json({ "code": 1, "msg": result })

            }
        })
    }


}

//新建账单
function addBill(req, res, next) {
    var uid = req.body.uid,
        icon = req.body.icon, //图标类名
        money = req.body.money,
        type = req.body.type, //收入或支出
        intro = req.body.intro; //描述,
    timer = req.body.timer;
    if (!uid && !icon && !money && !type && !intro && !timer) {
        res.json({ "code": 4, "msg": "缺少参数" })
    } else {
        mymongo.insert("bill_list", { uid: uid, icon: icon, money: money, type: type, intro: intro, timer: timer }, function(err, result) {
            if (err) {
                res.json({ "code": 0, "msg": "服务器错误" })
            } else {
                res.json({ "code": 1, "msg": "添加成功" })
            }
        })
    }

}

//删除账单

function deleteBill(req, res, next) {
    mymongo.delete("bill_list", { _id: req.query.id }, function(err, result) {
        if (err) {
            res.json({ "code": 0, "msg": "服务器错误" })
        } else {
            res.json({ "code": 1, "msg": "删除成功" })
        }
    })
}


module.exports = {
    getBill: getBill,
    addBill: addBill,
    deleteBill: deleteBill
}