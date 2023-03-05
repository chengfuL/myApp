// 云函数入口文件
const cloud = require('wx-server-sdk')
const got = require('got'); //引用 got
cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
}) // 使用当前云环境

// 云函数入口函数
exports.main = async (context) => {
    // const url = "https://api.openai.com/v1/completions"
    const url = "https://api.openai.com/v1/chat/completions"
    // const url = "http://10.36.0.161:9999/api/chatapi"
    // API密钥
    const api_key = "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";

    // 接口的请求数据
    // const data = {
    //     prompt: context.prompt,
    //     // "model": 'text-davinci-003',
    //     "model": 'gpt-3.5-turbo',
    //     "max_tokens": 2048,
    //     "temperature": 0,
    //     "top_p": 1,
    //     "frequency_penalty": 0,
    //     "presence_penalty": 0.6,
    //     "stop": [" Human:", " AI:"]
    // };
    const data = {
        "messages": context.prompt,
        "model": 'gpt-3.5-turbo',
    };

    try {
        let postResponse = await got(url, {
            method: 'POST', //post请求
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + api_key
            },
            body: JSON.stringify(data)
        })
        return postResponse.body //返回数据
    } catch (error) {
        return error
    }

}