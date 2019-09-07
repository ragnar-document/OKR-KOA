// pages/home/home.js
import User from '../../models/user.js'
import Project from '../../models/project.js'
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    todoslist:[],
    userInfo:[],
    logoShowbtn:true,
    user_id:''
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.render();
  },
  render:function(){
    app.login()
  },

  loginbtn:function(){
    app.login().then(res=>{
      console.log(res)
      let userInfo = app.globalData.userInfo;
      let user_id = app.globalData.user_id;
      if (!userInfo || !user_id) {
        return
      }
      Project.todosList(user_id).then(todosListRes => {
        let todoslist = todosListRes.todolist.todolist
        console.log(todoslist)
        this.setData({
          todoslist: todoslist,
          userInfo: userInfo,
          logoShowbtn: false,
          user_id: user_id,
        })
      })
      // this.setData({
      //   userInfo: userInfo,
      //   logoShowbtn: false,
      //   user_id: user_id,
      // })
    this.render();
    })
  },

  actionSheet:function(event){
    wx.showActionSheet({
      itemList: ['查看详情', '关联内容'],
      success(res) {
        if (res.tapIndex == 0){
          wx.navigateTo({
            url: '/pages/details/details',
          })
        }else if(res.tapIndex == 1){
          wx.navigateTo({
            url: '/pages/addokr/addokr',
          })
        }
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },



  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})