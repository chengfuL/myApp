// 云函数入口文件
const cloud = require('wx-server-sdk')
const got = require('got'); //引用 got
cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
}) // 使用当前云环境

// 云函数入口函数
exports.main = async (context) => {
    const url = "http://2768a599.r1.cpolar.top/api/chatapi"

    const data = {
        "messages": context.prompt,
    };

    try {
        let postResponse = await got(url, {
            method: 'POST', //post请求
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        return postResponse.body //返回数据
    } catch (error) {
        return error
    }

}