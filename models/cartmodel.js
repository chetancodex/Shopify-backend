const { Sequelize } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Cart = sequelize.define("cart", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        productId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'products', 
                key: 'id'
            }
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });
    Cart.belongsTo(User, { foreignKey: 'username' });
    Cart.belongsTo(Product, { foreignKey: 'productId' });
    return Cart;
};
