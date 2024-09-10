const express = require("express");
const cors = require("cors");
const { sequelize } = require("./DB/dbConnection.js");
const { bootstrap } = require("./src/index.routes.js");

require('./DB/models/associate.js');  // Import associations setup
const app = express();
const port = 3000;

sequelize.sync({ force: false});

app.use(cors());
app.options("*", cors());
app.use("/", express.static("uploads"));


app.use(express.json());
bootstrap(app)

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
