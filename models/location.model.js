// Location model (schema)

module.exports = (sequelize, Sequelize) => {
    const Location = sequelize.define("location", {
      userid: {
        type: Sequelize.STRING,
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
          type: Sequelize.FLOAT,
          allowNull: false
      }
    })

    return Location;
};