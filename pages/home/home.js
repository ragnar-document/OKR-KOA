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
    pageShow: false,
    todoslist: [],
    userInfo: [],
    logoShowbtn: true,
    user_id: ''
  },
  
  onShow:function(){
    this.render(this.data.user_id)
  },
  //渲染列表
  render: function(id) {
    let user_id = app.globalData.user_id;
    Project.todosList(id).then(todosListRes => {
      let todoslist = todosListRes.todolist.todolist
      this.setData({
        todoslist: todoslist,
        logoShowbtn: false,
        user_id: user_id,
      })
    })
  },

  //获取登陆信息事件
  login: function() {
    app.getUserInfo().then(res => {
      console.log(res)
      this.setData({
        userInfo: res,
        user_id: res.user_id,
        pageShow:true
      })
      this.render(res.user_id);
    })
  },

  //登陆点击事件
  onGotUserInfo: function(e) {
    if (e.detail.userInfo) {
      this.login()
    }
  },

  actionSheet: function(e) {
    let id = e.currentTarget.dataset.id 
    console.log(id)
    let _this = this;
    wx.showActionSheet({
      itemList: ['查看详情', '关联内容', '编辑内容', '完成项目', '删除'],
      success(res) {
        if (res.tapIndex == 0) {
          wx.navigateTo({
            url: '/pages/details/details?id=' + id,
          })
        } else if (res.tapIndex == 1) {
          wx.navigateTo({
            url: '/pages/addokr/addokr?id=' + id,
          })
        } else if (res.tapIndex == 2) {
          wx.navigateTo({
            url: '/pages/editpage/editpage?id=' + id,
          })
        } else if (res.tapIndex == 3) {
          let over_time = new Date()
          let params = {
            status: 2
          };
          Project.todosUpdate(id, {
            params
          })
          _this.render(_this.data.user_id)
        } else if (res.tapIndex == 4) {
          Project.todosDel(id)
          _this.render(_this.data.user_id)
        }
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  }
})