export const request = (params) => {
  let token = wx.getStorageSync('token'); //获取token 存入header
  console.log(params)
  if (token) {
    params.headers = params.headers ? params.headers : {}
    params.headers['Authorization'] = token
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url: params.url,
      data: params.data || {},
      header: params.headers,
      method: params.method || 'GET',
      success: (res) => {
        if (res.data.code === 200) {
          resolve(res.data.data)
        } else {
          wx.showModal({
            title: '注意',
            content: res.data.data.message,
            confirmText: "确定",
            showCancel: false,
          })
          reject()
        }
      },
      fail: (err) => {
        console.log(err)
        wx.showModal({
          title: '服务端出现故障',
          content: err.errMsg,
          confirmText: "确定",
          showCancel: false,
        })
        reject()
      }
    })
  })
}