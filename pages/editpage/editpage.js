// pages/editpage/editpage.js
import Project from '../../models/project.js';
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    todolist: [],
    options_id:null,
    createData: {
      title: '',
      target: '',
      start_time: '',
      end_time: '',
      remark: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.render(options.id)
  },

  render: function (id) {
    let user_id = app.globalData.user_id;
    Project.todosItem(id, user_id).then(res => {
      console.log(res)
      this.setData({
        createData: res.projectDetails[0],
        todolist: res.projectDetails[0],
        options_id: id
      })
    })
  },

  editProject:function(){
    let id = this.data.options_id;
    let params = this.data.createData;
    console.log(id);
    Project.todosUpdate(id,{params})
  },

  changeName: function (e) {
    let createData = this.data.createData;
    createData.title = e.detail.value;
    this.setData({
      createData: createData
    })
  },
  changeTarget: function (e) {
    let createData = this.data.createData;
    createData.target = e.detail.value;
    this.setData({
      createData: createData
    })
  },
  changeRemark: function (e) {
    let createData = this.data.createData;
    createData.remark = e.detail.value;
    this.setData({
      createData: createData
    })
  },
  startDateChange: function (e) {
    let createData = this.data.createData;
    createData.start_time = e.detail.value;
    this.setData({
      createData: createData
    })
  },
  endDateChange: function (e) {
    let createData = this.data.createData;
    createData.end_time = e.detail.value;
    this.setData({
      createData: createData
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