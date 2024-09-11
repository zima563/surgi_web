const ListenModel = require("../../../DB/models/listen.model.js");
const userModel = require("../../../DB/models/user.model.js");
const { catchError } = require("../../middlewares/catchError.js");
const apiError = require("../../utils/apiError.js");
const SequelizeFeatures = require("../../utils/apiFeatures.js");



const addListen = catchError(async (req, res) => {
  if (req.files) {
    req.body.images = req.files.map((val) => `https://pickapi.surgi-web.com/${val.filename}`);
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
  let updateDocumentCount = await ListenModel.update(req.body, {
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
