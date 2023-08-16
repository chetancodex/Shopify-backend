const { Sequelize } = require('sequelize');
const User = require('./usermodel');
const Product = require('./productmodel');

module.exports = (sequelize,Sequelize) => {
    const Cart = sequelize.define("usercart", {
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            references: {
                model: User, // Use the imported User model
                key: 'username'
            }
        },
        productId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: Product, // Use the imported Product model
                key: 'id'
            }
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false,
            default : 1
        }
    });
    return Cart;
};
