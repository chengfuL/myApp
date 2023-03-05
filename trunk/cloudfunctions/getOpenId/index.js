// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ // 初始化云开发环境
    env: cloud.DYNAMIC_CURRENT_ENV // 当前环境的常量
})
const db = cloud.database()
const db_date = db.serverDate()

// 云函数入口函数
exports.main = async (event, context) => {
    let OPENID = cloud.getWXContext().OPENID
    // 查询用户信息
    let res = await cloud.callFunction({
        name: 'getElementByOpenId',
        data: {
            list: "UserList",
            _openid: OPENID
        }
    })
    let data = res.result.data
    // 另一半id
    let OPENIDB = ""
    // 如果用户已在
    if (data && data.length) {
        OPENIDB = data[0]._openidB
    } else {
        // 用户不存在，新增用户
        await db.collection("UserList").add({
            data: {
                _openid: OPENID,
                createDate: db_date,
                credit: 0,
                _openidB: "",
                nickName: event.nickName
            }
        })
    }
    // 返回当前用户的身份信息，用于数据库记录和查询
    return {
        _openidA: OPENID,
        _openidB: OPENIDB
    }
}