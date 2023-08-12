module.exports = (sequelize,Sequelize) => {
    const Product =   sequelize.define("Product", {
        image : {
            type : Sequelize.STRING
        },
        name : {
            type : Sequelize.STRING
        },
        description : {
            type : Sequelize.STRING
        },
        rating : {
            type : Sequelize.INTEGER
        },
        price : {
            type : Sequelize.INTEGER
        },
        brand : {
            type : Sequelize.STRING
        },
        modelName : {
            type : Sequelize.STRING
        },
        color : {
            type : Sequelize.STRING
        }
    });
    return Product
}