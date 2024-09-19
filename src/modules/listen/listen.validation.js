
const Joi = require("joi");

const addListenVal = Joi.object({
  offerType: Joi.string().valid("Rent", "Sale").required(),
  category: Joi.string().valid("Commercial", "Residential").required(),
  propertyType: Joi.string().valid(
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
  ).required(),
  propertyLocation: Joi.string().required(),
  AssignedAgent: Joi.string().required(),
  Reference: Joi.string().trim().required(),
  Available: Joi.date().default(Date.now),
  Rooms: Joi.number().integer().min(0).max(20).required(),
  Bathrooms: Joi.number().integer().min(0).max(20).required(),
  propertySize: Joi.number().integer().min(50).max(1000).required(),
  unitNumber: Joi.number().integer().min(0).max(999).optional(),
  plotSize: Joi.number().integer().min(0).max(999).optional(),
  noOfParkingSpace: Joi.number().integer().min(0).max(999),
  floorNumber: Joi.number().integer().min(0).max(99),
  finishingType: Joi.string().valid("Fully-Finishing", "Semi-Finishing", "Unfinishing").required(),
  furnishingType: Joi.string().valid("Unfurnished", "Semi-Furnished", "Furnished"),
  Amenities: Joi.array().items(Joi.string()),
  titleAr: Joi.string().required(),
  titleEn: Joi.string().required(),
  descAr: Joi.string().required(),
  descEn: Joi.string().required(),
  propertyPrice: Joi.number().required(),

  paymentMethod: Joi.string().valid("Cash", "Installments", "Cash & Installments").allow(null, '').optional(),

  images: Joi.array()
    .items(
      Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string()
          .valid("image/png", "image/jpg", "image/jpeg")
          .required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
        size: Joi.number().max(5242880).required(),
      })
    )
    .min(0).required(),

  publish: Joi.boolean().default(false),

  // Conditional fields
  downPayment: Joi.when('paymentMethod', {
    is: Joi.string().valid('Installments', 'Cash & Installments'),
    then: Joi.number().positive().required(),
    otherwise: Joi.forbidden(),
  }),

  numberOfYears: Joi.when('paymentMethod', {
    is: Joi.string().valid('Installments', 'Cash & Installments'),
    then: Joi.number().positive().integer().required(),
    otherwise: Joi.forbidden(),
  }),

  rentalPeriod: Joi.when('offerType', {
    is: 'Rent',
    then: Joi.string().valid("Per Month", "Per Day").required(),
    otherwise: Joi.forbidden(),
  }),
});

const updateListenVal = Joi.object({
  id: Joi.string().required(),

  offerType: Joi.string().valid("Rent", "Sale"),
  category: Joi.string().valid("Commercial", "Residential"),
  propertyType: Joi.string().valid(
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
  propertyLocation: Joi.string(),
  AssignedAgent: Joi.string(),
  Reference: Joi.string().trim(),
  Available: Joi.date().default(Date.now),
  Rooms: Joi.number().integer().min(0).max(20),
  Bathrooms: Joi.number().integer().min(0).max(20),
  propertySize: Joi.number().integer().min(50).max(1000),
  unitNumber: Joi.number().integer().min(0).max(999).optional(),
  plotSize: Joi.number().integer().min(0).max(999).optional(),
  noOfParkingSpace: Joi.number().integer().min(0).max(999),
  floorNumber: Joi.number().integer().min(0).max(99),
  finishingType: Joi.string().valid("Fully-Finishing", "Semi-Finishing", "Unfinishing"),
  furnishingType: Joi.string().valid("Unfurnished", "Semi-Furnished", "Furnished"),
  Amenities: Joi.array().items(Joi.string()),
  titleAr: Joi.string(),
  titleEn: Joi.string(),
  descAr: Joi.string(),
  descEn: Joi.string(),
  propertyPrice: Joi.number(),

  paymentMethod: Joi.string().valid("Cash", "Installments", "Cash & Installments").allow(null, '').optional(),

  images: Joi.array()
    .items(
      Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string()
          .valid("image/png", "image/jpg", "image/jpeg")
          .required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
        size: Joi.number().max(5242880).required(),
      })
    )
    .min(0),

  publish: Joi.boolean().default(false),

  // Conditional fields
  downPayment: Joi.when('paymentMethod', {
    is: Joi.string().valid('Installments', 'Cash & Installments'),
    then: Joi.number().positive(),
    otherwise: Joi.forbidden(),
  }),

  numberOfYears: Joi.when('paymentMethod', {
    is: Joi.string().valid('Installments', 'Cash & Installments'),
    then: Joi.number().positive().integer(),
    otherwise: Joi.forbidden(),
  }),

  rentalPeriod: Joi.when('offerType', {
    is: 'Rent',
    then: Joi.string().valid("Per Month", "Per Day").required(),
    otherwise: Joi.forbidden(),
  }),
});

module.exports = { addListenVal, updateListenVal };
