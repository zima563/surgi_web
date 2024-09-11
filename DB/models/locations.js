const { DataTypes } = require("sequelize");
const { sequelize } = require("../dbConnection");


const locationModel = sequelize.define("location",{
    id:{
       type: DataTypes.INTEGER,
       primaryKey: true,
       autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    }
})

module.exports = locationModel;