const express = require("express");
const router = express.Router();
const { signUp, signIn } = require("../controllers/auth");

router.post("/signup", signUp);
router.post("/signin", signIn);
module.exports = router;
/*
const passport = require("passport");
const { Router } = require("express");
const router = Router();
const { login, register } = require("../controllers/auth");
// test route
router.get("/", function (req, res) {
  res.json({ message: "ruta raiz que muestra que esta bien" });
});

//route to handle user registration
router.post(
  "/register",
  passport.authenticate("local.signup", {
    successRedirect: "/home",
    failureRedirect: "/users",
  })
);
router.post("/login", login);

module.exports = router;
*/
