//const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const { dialect } = require("../config/db.config.js");

// Note: currently have a hardcoded aws db password
// under source control. This is considered bad practice: https://security.stackexchange.com/questions/191590/why-is-storing-passwords-in-version-control-a-bad-idea

const sequelize = new Sequelize('weather_app', 'root', 'sunnyside', {
  host: "localhost",
  port: "3306",
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

