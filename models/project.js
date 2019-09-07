import { request } from '../models/request.js';
import API from '../models/api.js';


export default {
  insert(params) {
    return request({ url: API.createdProject, method: 'POST', data: { params } })
  },
  todosList(id){
    return request({ url: API.projectList(id) })
  },
  todosItem(id){
    return request({ url: API.projectItem(id) })
  }
}