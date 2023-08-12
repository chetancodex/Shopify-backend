module.exports = (sequelize , Sequelize) => {
    const UserUpdate = sequelize.define('UserUpdate',{
        username : {
            type : Sequelize.STRING
        },
        contactNumber : {
            type : Sequelize.STRING
        },
        city : {
            type : Sequelize.STRING
        },
        street : {
            type : Sequelize.STRING
        },
        houseNumber : {
            type : Sequelize.INTEGER
        },
        zipcode : {
            type : Sequelize.INTEGER
        }
    });
    return UserUpdate;
}