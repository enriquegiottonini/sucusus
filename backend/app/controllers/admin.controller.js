const db = require("../models");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;
var bcrypt = require("bcryptjs");

exports.create = (req, res) => {
    User.create({
        username: req.body.username,
        nombre: req.body.nombre,
        apellido_p: req.body.apellido_p,
        apellido_m: req.body.apellido_m,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
      })
        .then(user => {
          if (req.body.roles) {
            Role.findAll({
              where: {
                name: {
                  [Op.or]: req.body.roles
                }
              }
            }).then(roles => {
              user.setRoles(roles).then(() => {
                res.send({ message: "Moderador creado satisfactoriamente!" });
              });
            });
          } else {
            // user role = 1
            user.setRoles([2]).then(() => {
              res.send({ message: "Moderador creado satisfactoriamente!" });
            });
          }
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
  };

  exports.findAll = (req, res) => {
    const apellido_p = req.query.apellido_p;
    var condition = apellido_p ? { apellido_p: { [Op.like]: `%${apellido_p}%` } } : null;
    User.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users."
        });
      });
  };

  exports.findOne = (req, res) => {
    const id = req.params.id;
    User.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find User with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving User with id=" + id
        });
      });
  };

  exports.update = (req, res) => {
    const id = req.params.id;
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 8)
    }
    User.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating User with id=" + id
        });
      });
  };

  exports.delete = (req, res) => {
    const id = req.params.id;
    User.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete User with id=${id}. Maybe User was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete User with id=" + id
        });
      });
  };
  