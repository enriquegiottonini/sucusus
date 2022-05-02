module.exports = app => {
    const user = require("../controllers/admin.controller.js");
    var router = require("express").Router();
    // Create a new Mod
    router.post("/mod/create", user.create);
    // Retrieve all user
    router.get("/mod/get", user.findAll);
    // Retrieve a single User with id
    router.get("/mod/get/:id", user.findOne);
    // Update a User with id
    router.put("/mod/update/:id", user.update);
    // Delete a User with id
    router.delete("/mod/delete/:id", user.delete);
    app.use('/api', router);
  };