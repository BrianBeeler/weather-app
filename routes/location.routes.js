module.exports = app => {

    const tutorials = require("../controllers/location.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", location.create);

    app.use('/api/locations', router);

}
