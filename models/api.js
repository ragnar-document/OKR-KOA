const API = 'http://localhost:3000/api';
export default{
  login: API + '/login',
  relevance: API + '/relevance',
  relevances:(id)=>  `${API}/relevance/${id}`,
  relevanceDetails: (id) => `${API}/relevance/details/${id}`,
  createdProject: API + '/project/created',
  editProject:(id)=> `${API}/project/edit/${id}`,
  projectList:(id)=> `${API}/project/list/${id}`,
  projectItem:(id) => `${API}/project/list/item/${id}`,
  projectDetails: (id) => `${API}/project/details/${id}`,
}