import http from "../http-common";
const getAll = () => {
  return http.get("/mod/get");
};
const get = id => {
  return http.get(`/mod/get/${id}`);
};
const create = data => {
  return http.post("/mod/create", data);
};
const update = (id, data) => {
  return http.put(`/mod/update/${id}`, data);
};
const remove = id => {
  return http.delete(`/mod/delete/${id}`);
};
const findByApellido = apellido => {
  return http.get(`/mod/get?apellido=${apellido}`);
};
const AdminService = {
  getAll,
  get,
  create,
  update,
  remove,
  findByApellido
};
export default AdminService;
