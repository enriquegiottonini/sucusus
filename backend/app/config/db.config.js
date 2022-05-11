module.exports = {
  HOST: "localhost",
  USER: "enrique",
  PASSWORD: "2701",
  DB: "numb2",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
