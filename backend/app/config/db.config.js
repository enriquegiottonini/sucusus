module.exports = {
  HOST: "localhost",
  USER: "diego_torres",
  PASSWORD: "contrasena",
  DB: "numb2",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
