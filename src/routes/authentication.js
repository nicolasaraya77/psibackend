const express = require("express");
const router = express.Router();

const passport = require("passport");
const { isLoggedIn } = require("../lib/auth");
const passportconfig = require("../lib/passportconfig");
passportconfig(passport);

router.post("/login", (req, res, next) => {
  passport.authenticate("local-login", (err, user, info) => {
    if (err) {
      res.send({
        code: 400,
        failed: "un error ha ocurrido",
      });
    }
    if (!user) {
      res.send({
        code: 206,
        success: "Usuario no existe",
      });
    } else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send({
          code: 200,
          success: "inicio de sesión exitoso",
        });
        console.log(req.user);
      });
    }
  })(req, res, next);
});

router.post("/signup", (req, res, next) => {
  passport.authenticate("local-signup", (err, user, info) => {
    if (err) {
      res.send({
        code: 400,
        failed: "un error ha ocurrido",
      });
    }
    if (!user) {
      res.send({
        code: 206,
        success: "El email usado ya esta tomado",
      });
    } else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send({
          code: 200,
          success: "Registro nuevo exitoso",
        });
        console.log(req.user);
      });
    }
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logOut();
  res.send("LogOut exitoso");
});

module.exports = router;
