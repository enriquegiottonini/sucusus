module.exports = app =>{
    const students = require("../controllers/students.controller.js");
    var router=require("express").Router();
    router.post("/", students.create);
    app.use('/api/mod/cursos/GenerarConstancias', router);
};