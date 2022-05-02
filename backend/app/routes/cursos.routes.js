module.exports = app =>{
    const cursos = require("../controllers/cursos.controller.js");
    var router=require("express").Router();
    router.post("/", cursos.create);
    router.get("/:offset", cursos.getAll);
    router.get("/", cursos.getCount);
    router.get("/:id", cursos.getOne);
    router.put("/:id", cursos.update);
    router.delete("/:id", cursos.delete);
    app.use('/api/mod/cursos', router);
};