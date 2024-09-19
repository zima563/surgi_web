const express = require("express");
const { allowedTo, protectRoutes } = require("../user/user.controller.js");
const { validation } = require("../../middlewares/validation.js");
const { addListenVal, updateListenVal } = require("./listen.validation.js");
const {
  addListen,
  deleteListen,
  getListen,
  getListens,
  updateListen,
  getListensAll,
} = require("./listen.controller.js");
const { uploadArrayOfFiles, uploadFieldsOfFiles } = require("../../fileUpload/upload.js");

const listenRouter = express.Router();

listenRouter
  .route("/add")
  .post(protectRoutes, allowedTo("admin"), uploadArrayOfFiles("images"), validation(addListenVal), addListen);

listenRouter.route("/allpublish").get(getListens);

listenRouter
  .route("/all")
  .get(protectRoutes, allowedTo("admin"), getListensAll);



listenRouter
  .route("/:id")
  .get(protectRoutes, allowedTo("admin"), getListen)
  .put(
    protectRoutes, allowedTo("admin"),
    uploadArrayOfFiles("images"),
    validation(updateListenVal),
    updateListen
  )
  .delete(protectRoutes, allowedTo("admin"), deleteListen);


module.exports = listenRouter;