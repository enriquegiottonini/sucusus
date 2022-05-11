
module.exports = (sequelize, Sequelize) => {
    const students = sequelize.define("alumnos", {
        nombre: {
            type: Sequelize.STRING
        },
        apellido_paterno: {
            type: Sequelize.STRING
        },
        apellido_materno: {
            type: Sequelize.STRING
        },
        id_curso: {
            type: Sequelize.INTEGER
        }
    });
    return students;
}