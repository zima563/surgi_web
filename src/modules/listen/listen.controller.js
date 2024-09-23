const sharp = require("sharp");
const { v4: uuidv4 } = require('uuid');
const ListenModel = require("../../../DB/models/listen.model.js");
const userModel = require("../../../DB/models/user.model.js");
const { catchError } = require("../../middlewares/catchError.js");
const apiError = require("../../utils/apiError.js");
const SequelizeFeatures = require("../../utils/apiFeatures.js");
const path = require("path");

const addListen = catchError(async (req, res) => {
  if (req.files) {

    req.body.images = await Promise.all(req.files.map(async (file) => {
      // Clean up filename by replacing spaces with underscores (optional)
      const cleanedFilename = file.originalname.replace(/\s+/g, '_');

      const resizedFilename = encodeURIComponent(file.originalname);
      const outputPath = path.join("uploads", resizedFilename);
      await sharp(file.buffer)
        .resize(1400, 900)
        .toFile(outputPath);

      return `https://pickapi.surgi-web.com/uploads/${resizedFilename}`;
    }));
  }



  let listen = await ListenModel.create(req.body);

  res.status(200).json({ msg: "success", listen });
});

const publishById = catchError(async (req, res, next) => {
  let listen = await ListenModel.findByPk(req.params.id);
  if (!listen) next(new apiError("listen not found", 404));
  await ListenModel.update({ publish: true }, { where: { id: req.params.id } });
  res.json({ msg: "listen is published successfully" });
});

const getListensAll = catchError(async (req, res) => {
  let sequelizeFeatures = new SequelizeFeatures(ListenModel, req.query)
    .filter() // Apply filtering criteria
    .sort() // Apply sorting criteria
    .search("listenModel") // Apply search criteria
    .limitedFields(); // Select specific fields to return


  const { sequelizeQuery } = sequelizeFeatures;

  // Count the number of documents that match the modified query
  const countDocuments = await ListenModel.count({ where: sequelizeQuery.where });

  // Paginate based on the filtered document count
  sequelizeFeatures.paginate(countDocuments);
  let listens = await ListenModel.findAll({
    ...sequelizeQuery,
  });

  // Parse the images field from string to array for each listen object
  for (let listen of listens) {
    if (listen.images) {
      listen.images = JSON.parse(listen.images); // Parse images if it's a string
    }
  }

  res.json({
    msg: "success",
    paginationResult: sequelizeFeatures.paginationResult,
    countDocuments,
    listens,
  });
});

const getListens = catchError(async (req, res) => {
  let sequelizeFeatures = new SequelizeFeatures(ListenModel, req.query)
    .filter() // Apply filtering criteria
    .sort() // Apply sorting criteria
    .search("listenModel") // Apply search criteria
    .limitedFields(); // Select specific fields to return


  const { sequelizeQuery } = sequelizeFeatures;

  // Add condition to filter where publish is true
  sequelizeQuery.where = {
    ...sequelizeQuery.where,
    publish: true,
  };
  // Count the number of documents that match the modified query
  const countDocuments = await ListenModel.count({ where: sequelizeQuery.where });

  // Paginate based on the filtered document count
  sequelizeFeatures.paginate(countDocuments);

  let listens = await ListenModel.findAll({
    ...sequelizeQuery,
  });

  // Parse the images field from string to array for each listen object
  for (let listen of listens) {
    if (listen.images) {
      listen.images = JSON.parse(listen.images); // Parse images if it's a string
    }
  }

  res.json({
    msg: "success",
    paginationResult: sequelizeFeatures.paginationResult,
    countDocuments,
    listens,
  });
});

const getListen = catchError(async (req, res, next) => {
  let listen = await ListenModel.findByPk(req.params.id);
  !listen && next(new apiError("not listen found", 404));
  listen && res.status(200).json({ msg: "success", listen });
});

const updateListen = catchError(async (req, res, next) => {
  // Array to hold image URLs
  let imageUrls = [];

  // Process uploaded files and generate URLs
  if (req.files) {

    imageUrls = await Promise.all(req.files.map(async (file) => {

      const resizedFilename = encodeURIComponent(file.originalname);
      const outputPath = path.join("uploads", resizedFilename);
      await sharp(file.buffer)
        .resize(1400, 900)
        .toFile(outputPath);

      return `https://pickapi.surgi-web.com/uploads/${resizedFilename}`;
    }));
  }

  // Extract URLs from the body (assuming they are also under "images")
  if (req.body.images) {
    const urlsFromBody = Array.isArray(req.body.images) ? req.body.images : [req.body.images];
    imageUrls = imageUrls.concat(urlsFromBody.filter(item => item.startsWith('http')));
  }

  // Prepare data for update
  const updateData = { ...req.body, images: imageUrls };

  let updateDocumentCount = await ListenModel.update(updateData, {
    where: { id: req.params.id },
  });
  if (updateDocumentCount === 0) {
    return next(new apiError("listen not found", 404));
  }

  res.json({ msg: "success" });
});

const deleteListen = catchError(async (req, res, next) => {
  const deletedDocumentCount = await ListenModel.destroy({
    where: { id: req.params.id },
  });

  if (deletedDocumentCount === 0) {
    return next(new apiError("listen not found", 404));
  }

  res.json({ msg: "listen deleted successfully" });
});

module.exports = {
  addListen,
  getListen,
  getListens,
  getListensAll,
  updateListen,
  deleteListen,
};
