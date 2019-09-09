import { request } from '../models/request.js';
import API from '../models/api.js';

export default{
  insert(params){
    return request({ url: API.relevance, method:'POST', data:{params}});
  },
  all(id,params){
    return request({ url: API.relevances(id),data:params});
  },
  delItem(id){
    return request({ url: API.relevances(id), method:'DELETE'});
  },
  detailsUpdate(id, params) {
    return request({ url: API.relevanceDetails(id), method:'PUT', data: { 'status': params } })
  }
}