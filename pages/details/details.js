// pages/details/details.js
import Project from '../../models/project.js'
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    todolist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.render(options.id)
  },
  render:function(){
    let id = 2;
    Project.todosItem(id).then(res=>{
      this.setData({
        todolist: res.todolistItem.todolistItem[0]
      })
    })
    let todolist = [
      {
        value: '很好',
        createTime: '2019-09-01',
        status: 1
      }
    ]
    this.setData({
      todolist: todolist
    })
  },
  todoComplete:function(e){
    let index = e.target.dataset.index;
    if(index == ''){
      return
    }
    let todos = this.data.todolist;
    let _this = this
    if (todos[0].status == 1){
     wx.showModal({
       title: '提示',
       content: '是否确认已完成',
       success(res) {
         if (res.confirm) {
           console.log(todos[0].status)
           todos[0].status = 2;
           _this.setData({
             todos: todos
           })
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