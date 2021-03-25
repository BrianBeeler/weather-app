// Database configuration
// TODO: set up with hosted db?

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