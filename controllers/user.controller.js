const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = (req, res) => {

    // Validate request
    if (!req.body.username) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Create a User
    const user = {
      username: req.body.username,
    };

    // Save the User in the database
    User.create(user)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while creating the User."
        });
    });
};



// Find a single User with a username (login)
exports.login = (req, res) => {
    const username = req.params.username;

    User.findOne({
        where: {
            username: username
        }
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
          message: "Error retrieving User with username=" + username
        });
    })
};


