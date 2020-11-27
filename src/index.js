const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const flash = require("connect-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");
//const passport = require("./config/passport");

//modelos
// Importar el modelo
require("./models/TipoUsuarios");
require("./models/Usuarios");
//helpers para funciones
const helpers = require("./helpers");

//conexion a BD
const db = require("./config/db");

db.sync()
  .then(() => console.log("conetando al servidor"))
  .catch((error) => console.log(error));

const app = express();

// habilitar bodyParser para leer datos del formulario

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//---- settings -----
app.set("port", process.env.PORT || 4000);

// Agregamos express validator a toda la aplicación
app.use(expressValidator());

app.use(cookieParser());

//app.use(passport.initialize());
//app.use(passport.session());

app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:3000", //locacion del liente en react
  })
); //permitir cross origin requests
// sessiones nos permiten navegar entre distintas paginas sin volvernos a autenticar
app.use(
  session({
    secret: "secretcode",
    resave: false,
    saveUninitialized: false,
  })
);
// agregar flash messages
app.use(flash());

// Pasar var dump a la aplicación
app.use((req, res, next) => {
  res.locals.vardump = helpers.vardump;
  res.locals.mensajes = req.flash();
  res.locals.usuario = { ...req.user } || null;
  next();
});

//----routes----
app.use("/", routes());
// ----- servidor -----
app.listen(app.get("port"), () => {
  console.log("server on port", app.get("port"));
});
