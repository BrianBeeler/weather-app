module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: {
            args: true,
            msg: "Username already in use! Please sign in."
        }
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
        as: "zipcode"
    })
  
    return User;
};