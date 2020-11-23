const express = require("express");
const loginroutes = require("./routes/loginroutes");
const bodyParser = require("body-parser");
let cors = require("cors");
// body parser added
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Allow cross origin requests
app.use(cors());

const router = express.Router();

// test route
router.get("/", function (req, res) {
  res.json({ message: "welcome to our upload module apis" });
});

//route to handle user registration
router.post("/register", loginroutes.register);
router.post("/login", loginroutes.login);

app.use("/", router);
app.listen(4000);
