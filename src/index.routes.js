const { globalError } = require("./middlewares/globalError.js");
const listenRouter = require("./modules/listen/listen.routes.js");
const userRouter = require("./modules/user/user.routes.js");
const apiError = require("./utils/apiError.js");

exports.bootstrap = (app) => {

  app.use("/api/users",userRouter);
  app.use("/api/listens",listenRouter);
  app.get("/", (req, res) => res.send("Hello World!"));
  app.use("*", (req, res, next) => {
    next(new apiError(`not found endPoint : ${req.originalUrl}`, 404));
  });

  app.use(globalError);
};
