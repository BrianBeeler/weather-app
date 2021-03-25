const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const { dialect } = require("../config/db.config.js");
'wUK2eFEFniOW2Faq569A'
const sequelize = new Sequelize('briansdb', 'admin', 'beefbeefbeef', {
  host: 'database-2-instance-1.ca7njwm32rvr.us-east-2.rds.amazonaws.com',
  dialect: 'mysql', /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */

});

async function authenticate() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
authenticate();

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Add new models here
db.users = require("./user.model.js")(sequelize, Sequelize);
db.locations = require("./location.model.js")(sequelize, Sequelize);

module.exports = db;

