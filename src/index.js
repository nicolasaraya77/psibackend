const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

//---------Init---------
const app = express();
require("./config/passport");

//---- settings -----
app.set("port", process.env.PORT || 4000);
//------Midlewares------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:3000", //locacion del liente en react
  })
); //permitir cross origin requests
app.use(
  session({
    secret: "secretcode",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  app.locals.user = req.user;
  next();
});
//----routes----
app.use(require("./routes/auth"));
//app.use(require("./routes/user"));
// ----- servidor -----
app.listen(app.get("port"), () => {
  console.log("server on port", app.get("port"));
});
