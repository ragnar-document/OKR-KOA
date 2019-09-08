// pages/details/details.js
import Project from '../../models/project.js';
import Relevance from '../../models/relevance.js'
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    todolist:[],
    details:[],
    options_id:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.render(options.id)
  },
  render:function(id){
    let user_id = app.globalData.user_id;
    Project.todosItem(id, user_id).then(res=>{

      console.log(res)
      this.setData({
        todolist: res.projectDetails[0],
        details: res.projectTaget,
        options_id: id
      })
    })
  },
  todoComplete:function(e){
    let index = e.currentTarget.dataset.index;
    let status = e.currentTarget.dataset.status;
    console.log(e.currentTarget.dataset)
    let todos = this.data.todolist;
    let _this = this
    if (status == 1){
     wx.showModal({
       title: '提示',
       content: '是否确认已完成',
       success(res) {
         if (res.confirm) {
           let id = _this.data.options_id;
           Relevance.detailsUpdate(index,status)
           _this.render(id)
         } else if (res.cancel) {
           console.log('用户点击取消')
         }
       }
     })
   }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
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