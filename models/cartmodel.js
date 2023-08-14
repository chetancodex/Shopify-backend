const { Sequelize } = require('sequelize');
const User = require('./usermodel');
const Product = require('./productmodel');

module.exports = (sequelize,Sequelize) => {
    const Cart = sequelize.define("cart", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        uid: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: User, // Use the imported User model
                key: 'id'
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
