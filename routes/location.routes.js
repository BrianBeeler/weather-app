module.exports = app => {

    const locations = require("../controllers/location.controller.js");
  
    var router = require("express").Router();
  
    // All location api routes
    router.post("/", locations.create);
    router.get("/:userid", locations.findAll);
    router.delete("/", locations.delete);
    app.use('/api/locations', router);

}
