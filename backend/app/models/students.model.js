
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
        nombre_curso: {
            type: Sequelize.STRING
        }
    });
    return students;
}