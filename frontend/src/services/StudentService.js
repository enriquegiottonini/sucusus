import http from "../http-common";

const create = data => {
    return http.post("/mod/cursos/GenerarConstancias", data);
};

const StudentService = {
    create,
};

export default StudentService;