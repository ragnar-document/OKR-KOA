import {
  request
} from '../models/request.js';
import API from '../models/api.js';


export default {
  insert(params) {
    return request({
      url: API.createdProject,
      method: 'POST',
      data: {
        params
      }
    })
  },
  todosList(id) {
    return request({
      url: API.projectList(id)
    })
  },
  todosItem(id, params) {
    return request({
      url: API.projectDetails(id),
      data: {
        'user_id': params
      }
    })
  },
  todosDel(id) {
    return request({
      url: API.projectList(id),
      method: 'DELETE'
    })
  },
  todosUpdate(id, params) {
    console.log(params)
    return request({
      url: API.editProject(id),
      method: 'PUT',
      data: {
        params
      }
    })
  },
  todosHistory(id) {
    return request({
      url: API.projectHistory(id)
    })
  }
}