const express = require("express");
const { validation } = require("../../middlewares/validation");
const { addLocation, getLocations, deleteLocation, updateLocation } = require("./location.controller");
const { updateLocationVal, addLocationVal } = require("./location.validation");
const paramsIdVal = require("../../utils/idValidator");

const locationRouter = express.Router();

locationRouter.route("/add").post(validation(addLocationVal), addLocation);
locationRouter.route("/all").get(getLocations);
locationRouter.route("/:id").put(validation(updateLocationVal), updateLocation).delete(validation(paramsIdVal), deleteLocation);

module.exports = locationRouter;