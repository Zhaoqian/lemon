var mymongo = require("mymongo1610");

function userlist(req, res, next) {
    var nick_name = req.body.nick_name;
    mymongo.insert("userlist", { nick_name: nick_name }, function(err, result) {
        if (err) {
            res.json({ code: 0, msg: "服务器错误" })
        } else {
            res.json({ code: 1, msg: result.insertedId })
        }
    })
}
module.exports = {
    userlist: userlist
}