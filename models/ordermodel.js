const { Sequelize } = require(".");
const User = require("./usermodel");
const Product = require("./productmodel");
module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define("Order", {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    productId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Product,
        key: "id",
      },
    },
  });
  return Order;
};
