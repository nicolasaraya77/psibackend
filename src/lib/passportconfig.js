const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const pool = require("../database");
const helpers = require("./helpers");

const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;

module.exports = function (passport) {
  // passport session setup ==================================================

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  // LOCAL SIGNUP ============================================================

  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      function (req, email, password, done) {
        pool.query(
          "SELECT * FROM Usuario WHERE email = ?",
          [email],
          async (err, rows) => {
            console.log(rows);
            console.log("above row object");
            if (err) return done(err);
            if (rows.length) {
              return done(
                null,
                false,
                req.flash("signupMessage", "That email is already taken.")
              );
            } else {
              const {
                TipoUsuario_id_TipoUsuario,
                nombre,
                nombre_social,
              } = req.body;
              let newUserMysql = {
                TipoUsuario_id_TipoUsuario,
                nombre,
                nombre_social,
              };
              newUserMysql.email = email;
              newUserMysql.password = await helpers.encryptPassword(password);
              console.log(newUserMysql.password);
              pool.query(
                "INSERT INTO Usuario SET ? ",
                newUserMysql,
                function (err, rows) {
                  newUserMysql.id = rows.insertId;
                  return done(null, newUserMysql);
                }
              );
            }
          }
        );
      }
    )
  );

  // LOCAL LOGIN =============================================================

  passport.use(
    "local-login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      function (req, email, password, done) {
        pool.query(
          "SELECT * FROM Usuario WHERE email = ?",
          [email],
          async (err, rows) => {
            if (err) return done(err);
            if (!rows.length) {
              return done(null, false);
            }
            const validPassword = await helpers.matchPassword(
              password,
              rows[0].password
            );
            if (!validPassword) {
              console.log("Wrong password");
              return done(null, false);
            }
            return done(null, rows[0]);
          }
        );
      }
    )
  );
};
