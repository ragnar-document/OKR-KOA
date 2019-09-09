/*
*登陆请求文件
*/
import User from './user.js'

module.exports = {
  getUserInfo: function () {
    const app = getApp();

    return new Promise((resolve, reject) => {
      let userInfo = userInfo = wx.getStorageSync('userInfo');
      // if(userInfo){
      //   this.globalData.userInfo = userInfo;
      //   resolve(userInfo);
      //   return
      // }

      let appUserInfo = app.globalData.userInfo;
      if (appUserInfo.id) {
        resolve(appUserInfo);
        return
      }

      // 查看授权
      wx.getSetting({
        success: (res) => {
          if (res.authSetting['scope.userInfo']) {
            // 登录获取 code
            wx.login({
              success: (wxLoginRes) => {
                const code = wxLoginRes.code;
                // 获取用户信息
                wx.getUserInfo({
                  success: (wxUserInfoRes) => {
                    const userInfo = wxUserInfoRes.userInfo;
                    // 请求登录
                    User.login(code).then(res => {
                      let token = res.token;
                      console.log(res.user_id)
                      userInfo.user_id = res.user_id;
                      app.globalData.user_id = res.user_id;
                      wx.setStorage({
                        key: 'token',
                        data: token
                      })
                      wx.setStorage({ key: 'userInfo', data: userInfo });
                      resolve(userInfo)
                    }).catch((err) => {
                      reject(err)
                    })
                  },
                  fail: () => reject({ message: '微信获取用户信息失败' })
                })
              },
              fail: () => reject({ message: '微信登录失败' })
            })
          } else {
            reject({ message: '用户没有授权' })
          }
        },
        fail: () => reject({ message: '微信获取用户授权失败' }),
      })
    })
  },
}