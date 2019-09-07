# OKR-KOA

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

