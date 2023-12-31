const dbConfig = require('../config/dbconfig');
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB,dbConfig.USER,dbConfig.PASSWORD, {
    host : dbConfig.HOST,
    dialect : dbConfig.dialect,
    pool : {
        max : dbConfig.pool.max,
        min : dbConfig.pool.min,
        acquire : dbConfig.pool.acquire,
        idle : dbConfig.pool.idle
    }
});
const db = {} ;
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Products = require('../models/productmodel')(sequelize,Sequelize);
db.Users = require('../models/usermodel')(sequelize,Sequelize);
db.Userupdate = require('../models/userupdatemodel')(sequelize,Sequelize);
db.usercart = require('../models/cartmodel')(sequelize,Sequelize);
db.Orders = require('../models/ordermodel')(sequelize,Sequelize);
db.Orderdetails = require('../models/orderdetailmodel')(sequelize,Sequelize)
module.exports = db;