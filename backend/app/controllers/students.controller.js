const db = require("../models");
const Student = db.student;
const Op = db.Sequelize.Op;

//Agregar curso
exports.create = (req, res) => {
    if (!req.body.nombre) {
        res.status(400).send({
          message: "Nombre no puede estar vacio"
        });
        return;
      }
    const student = {
        nombre: req.body.nombre,
        apellido_materno: req.body.apellido_materno,
        apellido_paterno: req.body.apellido_paterno,
        nombre_curso: req.body.nombre_curso,
    };
    Student.create(student)
    .then(data=>{
        res.send(data);
    })
    .catch(err=> {
        res.status(500).send({
            message:
                err.message || "Ocurrio un error."
        });
    });
};

// Buscar todos los alumnos de un curso en la base de datos
exports.getAllFromCourse = (req, res) => {
  Curso.findAll({
      offset: Number(req.params.offset),
      limit: 5,
      })
  .then(data=>{
      res.send(data);
  })
  .catch(err=>{
      res.status(500).send({
          message:
            err.message || "Ocurrio un error"
      });
  });
};