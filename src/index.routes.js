const { globalError } = require("./middlewares/globalError.js");
const messageRouter = require("./modules/message/message.routes.js");
const userRouter = require("./modules/user/user.routes.js");
const apiError = require("./utils/apiError.js");

exports.bootstrap = (app) => {
  // HTTPS://localhost:4000//api/users
  app.use("/api/users", userRouter);
  app.use("/api/messages", messageRouter);
  app.get("/", (req, res) => res.send("Hello World!"));
  app.use("*", (req, res, next) => {
    next(new apiError(`not found endPoint : ${req.originalUrl}`, 404));
  });

  app.use(globalError);
};
