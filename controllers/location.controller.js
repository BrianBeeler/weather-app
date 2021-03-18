const db = require("../models");
const Location = db.locations;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {

    console.log("Creating");
       // Validate request
 
 
   // Create a Location
   const location = {
     userid: req.body.userid,
     zipcode: req.body.zipcode,
     lat: req.body.lat,
     lng: req.body.lng
   };

   console.log("Creating Location: ", location);
 
   // Save Tutorial in the database
   Location.create(location)
     .then(data => {
       res.send(data);
     })
     .catch(err => {
       res.status(500).send({
         message:
           err.message || "Some error occurred while creating the Location."
       });
     });
 };

 // Retrieve all Tutorials from the database.
    exports.findAll = (req, res) => {
        var condition = {
            where: {
                userid : +req.params.userid
            }
        }
  
    console.log("Condition", condition);

    Location.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving locations for this user"
        });
      });
  
};
