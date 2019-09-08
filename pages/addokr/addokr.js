// pages/addokr/addokr.js
import {formatTime} from '../../utils/util.js';
import Relevance from '../../models/relevance.js'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: '',
    todolist: [],
    project_id:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.render(options.id);

  },
  render: function (id){
    let user_id = app.globalData.user_id;
    let params = {};
    params.project_id = id;
    console.log(params,123)
    Relevance.all(user_id,params).then(res=>{
      console.log(res)
      this.setData({
        todolist: res.targetData,
        project_id:id
      })
    })
  },
  inputChangeHandle: function(e) {
    this.setData({
      content: e.detail.value
    })
  },
  addOkr: function() {
    let user_id = app.globalData.user_id;
    let project_id = this.data.project_id;
    console.log(user_id)
    let content = this.data.content;
    content.trim();
    if (!content) {
      return wx.showToast({
        title: '请正确输入内容',
        icon: 'none',
        duration: 1000
      })
    }
    let create_time = formatTime(new Date);
    let status = 1;
    let todos = this.data.todolist;
    Relevance.insert({
      user_id,
      project_id,
      content,
      create_time,
      status
    })
    todos.push({
      content,
      create_time,
      status
    })
    this.setData({
      todolist: todos,
      content: ''
    })
  },
  todoDel: function(e) {
    console.log(e.target.dataset)
    let todos = this.data.todolist;
    let index = e.target.dataset.index;
    let id = e.target.dataset.id;

    let _this = this;
    wx.showModal({
      title: '提示',
      content: '是否删除此关联目标',
      success(res) {
        if (res.confirm) {
          Relevance.delItem(id)
          todos.splice(index, 1)
          _this.setData({
            todolist: todos
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
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})