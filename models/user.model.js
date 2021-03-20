// User model / schema
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

    return User;
};