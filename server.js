const express = require("express");
const cors = require("cors");
const { sequelize } = require("./DB/dbConnection.js");
const { bootstrap } = require("./src/index.routes.js");
const path = require('path')
require('./DB/models/associate.js');  // Import associations setup
const app = express();
const port = 4000;

sequelize.sync({ force: false });

app.use(cors());
app.options("*", cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



app.use(express.json());
bootstrap(app)

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
