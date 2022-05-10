const db = require("../models");
const Curso = db.cursos;
const Op = db.Sequelize.Op;

//Agregar curso
exports.create = (req, res) => {
    if (!req.body.nombre) {
        res.status(400).send({
          message: "Nombre no puede estar vacio"
        });
        return;
      }
    const curso ={
        nombre: req.body.nombre,
        encargado: req.body.encargado,
        modalidad: req.body.modalidad,
        duracion: req.body.duracion,
        numsesion: req.body.numsesion,
        fechasesion: req.body.fechasesion,
        consejo: req.body.consejo,
        fechainicio: req.body.fechainicio,
        fechafinal: req.body.fechafinal,
        addedby: req.body.addedby
    };
    Curso.create(curso)
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

// Buscar todos los cursos en la base de datos
exports.getAll = (req, res) => {
    const str=String(req.params.string)
    const parse = str.split('-');
    const type = parse[0];
    if(Number(type)===0){
        const [ ,offset, id] = parse;
        Curso.findAll({
            where: {
                addedby: Number(id)
            },
            offset: Number(offset),
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
    } else {
        const [ ,id] = parse;
        Curso.count({
            where: {
                addedby: id
            }
        })
        .then(data=>{
            if(data){
                res.send({num:data})
            } else {
                res.status(404).send({
                    message: `Ocurrio un error`
                });
            }
        })
        .catch(err=>{
            res.status(500).send({
                message: `Ocurrio un error`
            });
    });
    }
    
    
};
exports.getOne = (req, res) => {
    Curso.findByPk(req.params.id)
    .then(data => {
        if(data){
            res.send(data)
        } else {
            res.status(404).send({
                message: `Ocurrio un error`
            });
        }
    })
}
// Modificar un curso dado id
exports.update = (req, res) => {
    const id = req.params.id;
  Curso.update(req.body, {where: {id:id}
})
.then(num=>{
    if(num==1){
        res.send({
            message: "Se ha modificado exitosamente"
        });
    }
    else {
        res.send({
            message: "Ocurrio un error"
        });
    }
}).catch(err => {
    res.status(500).send({
        message: "Ocurrio un error"
    });
});
};

// Eliminar un curso dado id
exports.delete = (req, res) => {
    const id =req.params.id;
    Curso.destroy({
        where: {id : id}
    })
    .then(num=>{
        if(num==1){
            res.send({
                message: "Elimiando exitosamente"
            });
        }else {
            res.send({
                message: "No se pudo eliminar el curso"
            });
        }
    })
    .catch(err=>{
        res.status(500).send({
            message: "Ocurrio un error"
        });
    });
};

