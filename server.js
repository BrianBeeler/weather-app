'use strict';

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const referrerPolicy = require('referrer-policy')

// TODO: Refactor in import blank from "blank" syntax

const app = express();

// Needed for serving files in app.js
app.use(express.static('app'));

app.use(cors());

app.use(referrerPolicy({ policy: 'same-origin' }))

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'react-app/build')));

const db = require("./models");

// Refreshes the database

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, 'react-app/build/index.html'));
});


require("./routes/external.routes")(app);
require("./routes/user.routes")(app);
require("./routes/location.routes")(app);

app.get('*', function(req, res){
  res.status(404).send();
});


// TODO: Set up static 

// set port, listen for requests
const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});