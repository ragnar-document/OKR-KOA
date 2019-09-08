import { request } from '../models/request.js';
import API from '../models/api.js';

export default{
  insert(params){
    console.log(params)
    return request({ url: API.relevance, method:'POST', data:{params}});
  },
  all(id,params){
    console.log(id,params)
    return request({ url: API.relevances(id),data:params});
  },
  delItem(id){
    console.log(id)
    return request({ url: API.relevances(id), method:'DELETE'});
  },
  detailsUpdate(id, params) {
    return request({ url: API.relevanceDetails(id), method:'PUT', data: { 'status': params } })
  }
}