module.exports = app => {
    const tutorials = require("../controllers/tutorial.controller.js");
    const external = require("../controllers/external.controller.js");
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", tutorials.create);
  
    // Retrieve all published Tutorials
    router.get("/location/:zip", external.getLocationByZip);
  
    app.use('/api/external', router);
  };