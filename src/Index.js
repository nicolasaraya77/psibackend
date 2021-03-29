const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const inital = require("./services/initalRoles");
//init express
const app = express();
//config
const db = require("./config/db");
const { initial } = require("./services/initalRoles");
// Importar el modelo

require("./models/User");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

db.sync()
  .then(() => console.log("Conectado al Servidor"))
  .catch((error) => console.log(error));

app.listen(4000, () => {
  console.log("localhost");
});

initial();
