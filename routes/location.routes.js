module.exports = app => {

    const locations = require("../controllers/location.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", locations.create);
    router.get("/:userid", locations.findAll);

    app.use('/api/locations', router);

}
