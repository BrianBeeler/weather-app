// Database configuration
// Note: This is the local config. It is not used in the
// deployed heroku app, or in the latest git commits. 
// See models/index.js for current db setup. 

module.exports = {
    HOST: "database-1.ca7njwm32rvr.us-east-2.rds.amazonaws.com",
    USER: "root",
    PASSWORD: "net01642",
    DB: "testdb",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    options: {
        operatorsAliases: false
    }
  };