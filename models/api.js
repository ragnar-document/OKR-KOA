const API = 'http://localhost:3000/api';
export default{
  login: API + '/login',
  relevance: API + '/relevance',
  createdProject: API + '/project/created',
  projectList:(id)=> `${API}/project/list/${id}`,
  projectItem:(id) => `${API}/project/list/item/${id}`
}