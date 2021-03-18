module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("tutorial", {
      username: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });

    const Location = sequelize.define("location", {
        zip: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        cityname: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })

    User.hasMany(Location, { as: "locations" })
    Location.belongsTo(User, {
        foreignKey: "zip",
        as: "zip"
    })
  
    return User;
  };