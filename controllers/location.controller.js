const { sequelize } = require("../models");
const db = require("../models");
const Location = db.locations;
const Op = db.Sequelize.Op;

// Create and Save a new Location
exports.create = async (req, res) => {

    // Create a Location
    const location = {
        userid: req.body.userid,
        zipcode: req.body.zipcode,
        lat: req.body.lat,
        lng: req.body.lng
    }; 
    let selector = {
        where: {
            userid: req.body.userid,
            zipcode: req.body.zipcode,
        }
    }

    // If one's there, just return that one.
    // if one isn't there make one
    let found = await Location.findOne(selector);
    if (!found) {
        // Save Location in the database
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

 // Retrieve all Locations for a given userid
exports.findAll = (req, res) => {
    sequelize.query("SELECT distinct * FROM locations where userid="+req.params.userid, 
        { type: db.Sequelize.QueryTypes.SELECT }
    )
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




  