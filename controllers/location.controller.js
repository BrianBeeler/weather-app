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

 exports.delete = async (req, res) => {
     // Create a Location

    console.log("Does run!")

    let selector = {
        where: {
            userid: req.body.userid,
            zipcode: req.body.zipcode,
        }
    }

    console.log('selector:', selector);

    // If one's there, just return that one.
    // if one isn't there make one
    let found = await Location.findOne(selector);
    if (!found) {
        res.status(404).send({
            message: "User-location not found in database."
        })

    } else {
        try {
            Location.destroy(selector)
            .then(data => {
                res.status(200).send({"rows-deleted": data})
            })
        } catch(err) {
            res.sendStatus(500).send(err);
        }
        
    }
 }

 // Retrieve all Locations for a given userid
exports.findAll = (req, res) => {

    // Protect against sql injection, does sequelize.query have any filtering?
    // https://sequelize.org/master/manual/raw-queries.html#bind-parameter -YES

    sequelize.query("SELECT distinct * FROM locations where userid="+req.params.userid, 
        { type: db.Sequelize.QueryTypes.SELECT,
          replacements: ['active'] // Protects against scripting attacks
        }
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




  