const express = require("express");
const { validation } = require("../../middlewares/validation");
const { addLocation, getLocations, deleteLocation, updateLocation } = require("./location.controller");
const { updateLocationVal, addLocationVal } = require("./location.validation");
const paramsIdVal = require("../../utils/idValidator");
const { protectRoutes, allowedTo } = require("../user/user.controller");

const locationRouter = express.Router();

locationRouter.route("/add").post(protectRoutes, allowedTo("admin"), validation(addLocationVal), addLocation);
locationRouter.route("/all").get(protectRoutes, allowedTo("admin"), getLocations);
locationRouter.route("/:id").put(protectRoutes, allowedTo("admin"), validation(updateLocationVal), updateLocation).delete(protectRoutes, allowedTo("admin"), validation(paramsIdVal), deleteLocation);

module.exports = locationRouter;