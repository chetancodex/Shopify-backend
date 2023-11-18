const { Sequelize } = require("sequelize");
const User = require("./usermodel");
const Product = require("./productmodel");
module.exports = (sequelize, Sequelize) => {
  const Orderdetails = sequelize.define("OrderDetails", {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    total_amt: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
    payment_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
  return Orderdetails;
};