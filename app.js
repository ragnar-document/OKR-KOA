//app.js
import User from './models/user.js'
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

  },
  login: function() {
    let _this = this;
    return new Promise((resolve,reject)=>{
      wx.getUserInfo({
        success: function(wxUserInfores) {
          _this.globalData.userInfo = wxUserInfores.userInfo
          wx.login({
            success: (res) => {
              if (res.code) {
                User.login(res.code).then(res => {
                  let token = res.token;
                  _this.globalData.user_id = res.user_id;
                  wx.setStorage({
                    key: 'token',
                    data: token
                  })
                })
                resolve()
              } else {
                console.log('登录失败！' + res.errMsg)
                reject()
              }
            }
          })
        }
      })
    })
  },
  globalData: {
    userInfo: null,
    user_id: null,
  }
})