/* const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const cors = require("cors");

//---------Init---------
const app = express();

//-------Settings-------
app.set("port", process.env.PORT || 4000);

//------Midlewares------
app.use(cors());
app.use(express.json());

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//--------Routes--------
app.use(require("./routes/index"));
app.use(require("./routes/authentication"));
app.use(require("./routes/user"));

module.exports = app;
*/
