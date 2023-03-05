// pages/ChatGPT.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        text: "",
        isWait: false,
        messages: [{
            id: 0,
            isSent: false,
            content: "有什么可以帮助你"
        }],
        messageStr: "",
        messageArr: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        // this.init()
    },
    bindinput(e) {
        this.setData({
            text: e.detail.value
        })
    },
    // 发送消息
    sendMessage() {
        if (!this.data.text) {
            wx.showToast({
                title: '内容不能为空',
            })
            return
        }
        this.setData({
            text: "等待回复中...",
            isWait: true,
            // messageStr: this.data.messageStr + "\nHuman:" + this.data.text,
            messageArr: [...this.data.messageArr, {
                role: "user",
                content: this.data.text
            }],
            messages: [...this.data.messages, {
                id: this.data.messages.length,
                isSent: true,
                content: this.data.text
            }]
        })
        // return
        // 在需要使用ChatGPT的地方调用sendRequest函数
        this.sendRequest(this.data.messageArr, (answer) => {
            // 将返回的答案展示给用户
            console.log(answer);
            let answerStr = answer.content.replace(/\n/, "")
            answerStr = answerStr.replace(/\n/, "")
            if (answer == "网络超时") {
                wx.showToast({
                    title: '网络超时',
                    icon: 'none'
                });
                answerStr = ""
            }
            this.setData({
                text: "",
                isWait: false,
                // messageStr: this.data.messageStr + answerStr,
                messageArr: answer.role ? [...this.data.messageArr, answer] : this.data.messageArr,
                messages: [...this.data.messages, {
                    id: this.data.messages.length,
                    isSent: false,
                    content: answerStr || "我目前回答不了你这个问题，换个问题试试吧"
                }]
            })
        });

    },
    sendRequest(prompt, callback) {
        // ChatGPT接口的URL
        // const url = "https://api.openai.com/v1/engines/davinci-codex/completions";
        // const url = "https://api.openai.com/v1/engines/babbage/completions";
        wx.cloud.callFunction({
            name: 'chatGPTAPI',
            data: {
                prompt
            }
        }).then(
            (res) => {
                let result = res.result;
                console.log(result);
                callback(result);
            }
        ).catch((error) => {
            console.log(error);
            callback({
                content: "网络超时"
            })
        })
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})