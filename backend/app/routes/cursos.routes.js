module.exports = app =>{
    const cursos = require("../controllers/cursos.controller.js");
    var router=require("express").Router();
    router.post("/", cursos.create);
    router.get("/:string", cursos.getAll);
    router.get("/ModificarCurso/:id", cursos.getOne);
    router.put("/:id", cursos.update);
    router.delete("/:id", cursos.delete);
    router.get("/GenerarConstancias/:id", cursos.getOne);
    app.use('/api/mod/cursos', router);
};