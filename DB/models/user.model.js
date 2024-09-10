const bcrypt = require("bcrypt");
const { sequelize } = require("../dbConnection.js");
const { DataTypes } = require("sequelize");
const ListenModel = require("./listen.model.js");

const userModel = sequelize.define(
  "user",
  {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "user"),
      defaultValue: "user",
    },
    isBlocked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    confirmEmail: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    pinCode: {
      type: DataTypes.STRING,
    },
    pinCodeExpire: {
      type: DataTypes.DATE,
    },
    resetVerified: {
      type: DataTypes.BOOLEAN,
    },
    passwordChangedAt: {
      type: DataTypes.DATE,
    },
    logoutAt: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: true,
    tableName: "users", // Explicitly set the table name
    hooks: {
      // Hash password before saving the user
      beforeCreate: async (user) => {
        if (user.password) {
          user.password = bcrypt.hashSync(user.password, 8);
        }
      },
      // Hash password before updating the user
      beforeUpdate: async (user) => {
        if (user.password) {
          user.password = bcrypt.hashSync(user.password, 8);
        }
      },
    },
  }
);


module.exports = userModel;
