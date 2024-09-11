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
  .post(uploadArrayOfFiles("images"),validation(addListenVal), addListen);

listenRouter.route("/allpublish").get(getListens);

listenRouter
  .route("/all")
  .get( getListensAll);



listenRouter
  .route("/:id")
  .get(getListen)
  .put(
    validation(updateListenVal),
    updateListen
  )
  .delete( deleteListen);


  module.exports = listenRouter;