const db = require("../models");
const Location = db.locations;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {

    console.log("Creating");
       // Validate request
   if (!req.body.userId) {
     res.status(400).send({
       message: "Content can not be empty!"
     });
     return;
   }
 
 
   // Create a Tutorial
   const location = {
     userId: req.body.userId,
     zipcode: req.body.zipcode,
     lat: req.body.lat,
     lng: req.body.lng
   };
 
   // Save Tutorial in the database
   Location.create(location)
     .then(data => {
       res.send(data);
     })
     .catch(err => {
       res.status(500).send({
         message:
           err.message || "Some error occurred while creating the Tutorial."
       });
     });
 };