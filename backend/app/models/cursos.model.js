module.exports = (sequelize, Sequelize) => {
    const Cursos = sequelize.define("cursos", {
        nombre: {
            type: Sequelize.STRING
        },
        encargado: {
            type: Sequelize.STRING
        },
        modalidad: {
            type: Sequelize.STRING
        },
        duracion: {
            type: Sequelize.INTEGER
        },
        numsesion: {
            type: Sequelize.INTEGER
        },
        fechasesion: {
            type: Sequelize.STRING
        },
        consejo: {
            type: Sequelize.STRING  
        },
        fechainicio: {
            type: Sequelize.STRING
        },
        fechafinal: {
            type: Sequelize.STRING
        }
    });
    return Cursos;
}