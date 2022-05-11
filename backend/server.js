const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Role = db.role;
const User = db.user;

db.sequelize.sync( {alter: true} ).then(() => {
const Op = db.Sequelize.Op;

var bcrypt = require("bcryptjs");

/*   db.sequelize.sync( {force: true} ).then(() => {
  console.log('Drop and Resync Db');
  initial();
});
function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
} 

  // CREATE ADMIN 
  User.create({
    username: "admin",
    nombre: "",
    apellido_p: "",
    apellido_m: "",
    email: "",
    password: bcrypt.hashSync("admin", 8)
  })
  .then(user => {
        user.setRoles([3])
      });
} */

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Bienvenido a SUCUS" });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require("./app/routes/tutorial.routes")(app);
require("./app/routes/admin.routes")(app);
require("./app/routes/cursos.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
