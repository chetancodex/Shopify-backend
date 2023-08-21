const { Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('User', {
    username: {
      type: Sequelize.STRING,
      primarykey : true,
      allowNull : false
    },
    email: {
      type: Sequelize.STRING,
      allowNull : false
    },
    hash_password: {
      type: Sequelize.STRING,
      allowNull : false
    },
  });

  User.prototype.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.hash_password);
  };

  return User;
};
