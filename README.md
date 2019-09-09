# OKR-KOA微信前端页面

🏠目录结构

```
> dist	   // 放置插件
> images	// 放置图片
> models // 放置API 以及请求
> pages	// 页面
> util // 工具
```

🌞主要实现

1. 登陆用户后台保存用户openID生成返回一个用户user_id
2. 首页获取项目列表
3. 点击➕新建项目
4. 点击项目可以添加关联目标/删除/完成项目/编辑项目
5. 点击项目跳转详情页查看详情
6. 项目详情中的关联列表展示关联项目运行点击确认完成
7. 删除项目时把关联列表内的关联删除
8. 历史页展示已完成项目

✏️手绘一下想要的界面

![]()

✅实际产出的页面

![]()

📦封装请求api (部分例子)

```javascript
const API = 'http://localhost:3000/api';
export default{
  login: API + '/login',
  relevance: API + '/relevance',
  createdProject: API + '/project/created',
  projectList:(id)=> `${API}/project/list/${id}`,
  projectItem:(id) => `${API}/project/list/item/${id}`
}
```

📦封装request请求

```javascript
export const request = (params) => {
  let token = wx.getStorageSync('token'); //获取token 存入header
  console.log(params)
  if(token){
    params.headers = params.headers ? params.headers : {}
    params.headers['Authorization'] = token
  }
  return new Promise((resolve,reject)=>{
    wx.request({
      url: params.url,
      data:params.data || {},
      header:params.headers,
      method:params.method || 'GET',
      success:(res)=>{
        if(res.data.code === 200){
          resolve(res.data.data)
        }else{
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
```

😄请求方法使用

```javascript
import { request } from '../models/request.js';
import API from '../models/api.js';

export default{
  login(code){
    return request({url:API.login,method:'POST',data:{code}})
  }
}
```

