/* Main page of the app */
Page({
    data: {
        creditA: 0,
        creditB: 0,

        userA: '',
        userB: '',
    },

    async onShow() {
        this.getCreditA()
        this.getCreditB()
    },
    onLoad() {
        this.getOpenId()
    },
    // 获取用户openId
    getOpenId() {
        wx.cloud.callFunction({
                name: 'getOpenId',
                data: {
                    nickName: "卡比"
                }
            })
            .then(res => {
                getApp().globalData._openidA = res.result._openidA
                getApp().globalData._openidB = res.result._openidB || ""
                this.getCreditA()
                this.getCreditB()
            })
    },
    getCreditA() {
        if (!getApp().globalData._openidA) return
        wx.cloud.callFunction({
                name: 'getElementByOpenId',
                data: {
                    list: getApp().globalData.collectionUserList,
                    _openid: getApp().globalData._openidA
                }
            })
            .then(res => {
                this.setData({
                    creditA: res.result.data[0].credit,
                    userA: res.result.data[0].nickName
                })
            })
    },

    getCreditB() {
        if (!getApp().globalData._openidB) return
        wx.cloud.callFunction({
                name: 'getElementByOpenId',
                data: {
                    list: getApp().globalData.collectionUserList,
                    _openid: getApp().globalData._openidB
                }
            })
            .then(res => {
                this.setData({
                    creditB: res.result.data[0].credit,
                    userB: res.result.data[0].nickName
                })
            })
    },
})