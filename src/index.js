const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const cors = require("cors");
//---------Init---------
const app = express();

//---- settings -----
app.set("port", process.env.PORT || 4000);
//------Midlewares------
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors()); //permitir cross origin requests

//----routes----
app.use(require("./routes/user"));
// ----- servidor -----
app.listen(app.get("port"), () => {
  console.log("server on port", app.get("port"));
});
