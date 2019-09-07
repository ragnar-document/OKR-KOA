// pages/addokr/addokr.js
import { formatTime } from '../../utils/util.js';
import Relevance from '../../models/relevance.js'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:'',
    todolist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  inputChangeHandle: function (e) {
    this.setData({ value: e.detail.value })
  },
  addOkr:function(){
    let user_id = app.globalData.user_id;
    // let project_id = 
    console.log(user_id)
    let value = this.data.value;
    value.trim();
    if(!value){
      return wx.showToast({
        title: '请正确输入内容',
        icon: 'none',
        duration: 1000
      })
    }
    let createTime = formatTime(new Date);
    let status = 1;
    let todos = this.data.todolist;
    Relevance.insert({ value, createTime, status })
    todos.push({ value, createTime, status})
    this.setData({
      todolist: todos,
      value:''
    })
  },
  todoDel:function(e){
    console.log(e.target.dataset)
    let todos = this.data.todolist;
    let index = e.target.dataset.index

    let _this = this;
    wx.showModal({
      title: '提示',
      content: '是否删除此关联目标',
      success(res) {
        if (res.confirm) {
          todos.splice(index,1)
          _this.setData({
            todolist:todos
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
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