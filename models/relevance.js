import { request } from '../models/request.js';
import API from '../models/api.js';

export default{
  insert(params){
    console.log(params)
    return request({ url: API.relevance, method:'POST', data:{params}})
  }
}