const bcrypt = require("bcrypt");

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "L'email n'est pas valide",
        }
      }
    },
    roles: {
      type: Sequelize.DataTypes.ENUM('ADMIN', 'USER'),
      defaultValue: 'USER',
      allowNull: false

    },
    password: {
      type: Sequelize.STRING,
    }
  });

  User.beforeCreate(async function(user, options) {
    try {
      let hash = await bcrypt.hash(user.password, 10);
      user.password = hash;
    } catch (e) {
      throw e;
    }
  });

  User.isValidPassword = async function(password){
      let hash = await bcrypt.compare(this.password, password);
      return hash;
  }

  return User;

}
