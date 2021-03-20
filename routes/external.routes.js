module.exports = app => {
    const external = require("../controllers/external.controller.js");
    var router = require("express").Router();
  
    // Retrieve all external api routes
    router.get("/location/:zip", external.getLocationByZip);
    router.get("/weather/:lat/:lng", external.getWeatherMetaData);
 
    app.use('/api/external', router);
  };