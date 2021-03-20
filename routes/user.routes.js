module.exports = app => {

    const users = require("../controllers/user.controller.js");
    var router = require("express").Router();

    // All user api routes   
    router.post("/", users.create);
    router.post("/login/:username", users.login);

    app.use('/api/user', router);
};