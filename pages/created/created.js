// pages/created/created.js
import Project from '../../models/project.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    createData: {
      name: '',
      target: '',
      startTime: '',
      endTime: '',
      remark: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  changeName: function(e) {
    let createData = this.data.createData;
    createData.name = e.detail.value;
    this.setData({
      createData: createData
    })
  },
  changeTarget: function(e) {
    let createData = this.data.createData;
    createData.target = e.detail.value;
    this.setData({
      createData: createData
    })
  },
  changeRemark: function(e) {
    let createData = this.data.createData;
    createData.remark = e.detail.value;
    this.setData({
      createData: createData
    })
  },
  startDateChange: function(e) {
    let createData = this.data.createData;
    createData.startTime = e.detail.value;
    this.setData({
      createData: createData
    })
  },
  endDateChange: function(e) {
    let createData = this.data.createData;
    createData.endTime = e.detail.value;
    this.setData({
      createData: createData
    })
  },
  createProject: function(e) {
    let user_id = app.globalData.user_id;
    let title = this.data.createData.name;
    let target = this.data.createData.target;
    let start_time = this.data.createData.startTime;
    let end_time = this.data.createData.endTime;
    let remark = this.data.createData.remark;
    if (!user_id) {
      return wx.showToast({
        title: '请登陆用户！',
        icon: 'none',
        duration: 1000
      })
    } else if (!title || !target || !start_time || !end_time) {
      return wx.showToast({
        title: '请把项目丰富一下再提交吧！',
        icon: 'none',
        duration: 1000
      })
    }
    let status = 1;
    Project.insert({
      user_id,
      title,
      target,
      start_time,
      end_time,
      status,
      remark
    }).then(()=>{
      wx.showToast({
        title: '创建成功',
        icon: 'success',
        duration: 1000
      })
      setTimeout(()=>{
        wx.navigateBack({
          url: '/pages/home/home',
        })
      },500)
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