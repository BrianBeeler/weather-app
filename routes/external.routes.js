module.exports = app => {
    const tutorials = require("../controllers/tutorial.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", tutorials.create);
  
    // Retrieve all published Tutorials
    router.get("/location", external.getLocationByZip);
  
    app.use('/api/external', router);
  };