const { Sequelize } = require(".");
const User = require("./usermodel");
module.exports = (sequelize, Sequelize) => {
    const payment = sequelize.define("Payment", {
        email : {
            type : Sequelize.STRING,
            allowNull : false,
            references : {
                model : User,
                key  : "email"
            }
        },
        userId : {
            type : Sequelize.INTEGER,
            allowNull: false,
            references :  {
               model : User,
                key : "username"
            },
        },
        amount : {
            type : Sequelize.INTEGER,
            allowNull : false,
        },
    });
    return payment;
}