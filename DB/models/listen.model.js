const { DataTypes } = require("sequelize");
const { sequelize } = require("../dbConnection.js");
const userModel = require("./user.model.js");

const ListenModel = sequelize.define(
  "listen",
  {
    offerType: {
      type: DataTypes.ENUM("Rent", "Sale"),
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM("Commercial", "Residential"),
      allowNull: false,
    },
    propertyType: {
      type: DataTypes.ENUM(
        "Apartment",
        "Bungalow",
        "Duplex",
        "Full Floor",
        "Half Floor",
        "Land",
        "Penthouse",
        "Townhouse",
        "villa",
        "Whole Building",
        "Chalet",
        "Bulk Units",
        "Twin House",
        "iVilla",
        "Cabin",
        "Palace",
        "Roof"
      ),
      allowNull: false,
    },
    propertyLocation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    AssignedAgent: {
      type: DataTypes.STRING(255),
      references: {
        model: "users", // Reference the 'users' table
        key: "userName", // Reference the 'userName' field instead of 'id'
      },
      allowNull: false,
    },
    Reference: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      trim: true, 
    },
    Available: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    Rooms: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 20,
      },
    },
    Bathrooms: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 20,
      },
    },
    propertySize: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 50,
        max: 1000,
      },
    },
    unitNumber: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 999,
      },
    },
    plotSize: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 999,
      },
    },
    noOfParkingSpace: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 999,
      },
    },
    floorNumber:{
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 100,
      },
    },
    finishingType: {
      type: DataTypes.ENUM("Fully-Finishing", "Semi-Finishing", "Unfinished"),
      allowNull: false,
    },
    furnishingType: {
      type: DataTypes.ENUM("Furnished", "Semi-Furnished", "Unfurnished"),
      allowNull: true,
    },
    Amenities: {
      type: DataTypes.JSON, // Use JSON for array-like storage
    },
    titleAr: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    titleEn: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descAr: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    descEn: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    propertyPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    paymentMethod: {
      type: DataTypes.ENUM("Cash", "Installments", "Cash & Installments"),
      allowNull: false,
    },
    images: {
      type: DataTypes.JSON, // Use JSON for array-like storage
      allowNull: false,
    },
    publish: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }, 
    downPayment: {
      type: DataTypes.FLOAT,
      allowNull: true,  // Conditional logic will handle this in the logic layer
    },
    numberOfYears: {
      type: DataTypes.INTEGER,
      allowNull: true,  // Conditional logic will handle this in the logic layer
    },
    rentalPeriod: {
      type: DataTypes.ENUM('Per Month', 'Per Day'),
      allowNull: true,  // Conditional logic will handle this in the logic layer
    },
  },
  {
    timestamps: true,
  }
);

module.exports = ListenModel;
