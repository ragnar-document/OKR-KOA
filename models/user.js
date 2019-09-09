import { request } from '../models/request.js';
import API from '../models/api.js';

export default {
  login(code) {
    return request({
      url: API.login,
      method: 'POST',
      data: {
        code
      }
    })
  }
}