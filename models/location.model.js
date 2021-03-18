module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      userid: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      zipcode: {
          type: Sequelize.STRING,
          allowNull: false
      },
      lng: {
          type: Sequelize.FLOAT,
          allowNull: false
      },
      lat: {
          type: Sequelize.INTEGER,
          allowNull: false
      }
    })
};