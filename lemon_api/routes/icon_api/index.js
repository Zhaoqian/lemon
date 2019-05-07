var mymongo = require("mymongo1610");

//查村所有icon  
function findIcon(req, res, next) {
    mymongo.find("iconlist", function(err, result) {
        if (err) {
            res.json({ "code": 0, "msg": "服务器错误" })
        } else {
            res.json({ 'code': 1, "msg": result })
        }
    })
}

module.exports = {
    findIcon: findIcon
}