import http from "../http-common";
const getAll = (offset) => {
    return http.get(`/mod/cursos/${offset}`);
};

const create = data => {
    return http.post("/mod/cursos", data);
};

const update = (id, data) => {
    return http.put(`/mod/cursos/${id}`, data);
};
const remove = id => {
    return http.delete(`/mod/cursos/${id}`);
};
const getOne = (id) => {
    return http.get(`/mod/cursos/ModificarCurso/${id}`);
};
const get1 = (id) => {
    return http.get(`/mod/cursos/GenerarConstancias/${id}`);
};
const getCount = (id) => {
    return http.get(`/mod/cursos`);
};
const CursoService = {
    getAll,
    create,
    update,
    remove,
    getOne,
    getCount,
    get1
};

export default CursoService;