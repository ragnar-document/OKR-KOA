// pages/history/history.js
import Project from '../../models/project.js';
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
    Project.todosHistory(options.id).then(res=>{
      console.log(res.todolist)
      this.setData({
        todolist: res.todolist.todolist
      })
    })
  }
})