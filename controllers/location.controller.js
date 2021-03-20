const { sequelize } = require("../models");
const db = require("../models");
const Location = db.locations;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = async (req, res) => {

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
 
   
   let selector = {
       where: {
            userid: req.body.userid,
            zipcode: req.body.zipcode,
       }
   }

   let found = await Location.findOne(selector);
   if (!found) {
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
   } else {
       res.send(found);
   }

 };

 // Retrieve all Tutorials from the database.
    exports.findAll = (req, res) => {

    sequelize.query("SELECT distinct * FROM locations where userid="+req.params.userid, 
        { type: db.Sequelize.QueryTypes.SELECT }
    )
      .then(data => {
        
        console.log("data length", data.length)
        console.log("data", data);

        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving locations for this user"
        });
      });
  
    };


    exports.findAllWithWeather = (req, res) => {
        var condition = {
            where: {
                userid : req.params.userid
            }
        }
  
    console.log("Condition", condition);

    Location.findAll(condition)
      .then(data => {
        let asynfunctions = []
        for (i=0;i<data.length;i++) {
            asyncfunctions.push(()=> 
            {
                console.log("function did run");
                lat=data[i].lat;
                lng=data[i].lng
                let url = "https://api.weather.gov/points/"+lat+","+lng;
                goGetWeatherData(url);
            })()
        }

        Promise.all(asynfunctions).then((results) =>{
            console.log("Results", results);
            res.send(results)
        })
        // for all locations, get whether, return payload
        

      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving locations for this user"
        });
      });
  
    };


  