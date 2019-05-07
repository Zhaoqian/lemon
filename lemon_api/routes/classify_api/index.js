var mymongo = require("mymongo1610");

//查村用户下所有的分类
function findClass(req, res, next) {
    var uid = req.body.uid,
        c_type = req.body.type;
    if (!uid || !c_type) {
        res.json({ "code": 4, "msg": "缺少参数" })
    } else {
        mymongo.find("classify", { uid: uid, c_type: c_type }, function(err, result) {
            if (err) {
                res.json({ "code": 0, "msg": "服务器错误" })
            } else {
                res.json({ 'code': 1, "msg": result })
            }
        })
    }

}

//添加分类

function addClassify(req, res, next) {
    var uid = req.body.uid,
        c_type = req.body.c_type,
        c_name = req.body.c_name,
        c_icon = req.body.c_icon;
    if (!uid || !c_type || !c_name || !c_icon) {
        res.json({ "code": 4, "msg": "缺少参数" })
    } else {
        mymongo.insert("classify", { uid: uid, c_name: c_name, c_icon: c_icon, c_type: c_type }, function(err, result) {
            if (err) {
                res.json({ "code": 0, "msg": "服务器错误" })
            } else {
                res.json({ 'code': 1, "msg": "添加成功" })
            }
        })
    }
}

module.exports = {
    findClass: findClass,
    addClassify: addClassify
}