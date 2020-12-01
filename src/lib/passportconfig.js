const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const pool = require("../database");
const helpers = require("./helpers");

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
              pool.query(
                "INSERT INTO Usuario SET ? ",
                newUserMysql,
                function (err, rows) {
                  newUserMysql.id = pool.query("SELECT LAST_INSERT_ID()");
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
            console.log(rows[0]);
            return done(null, rows[0]);
          }
        );
      }
    )
  );
};
// WEB TOKEN =============================================================

passport.use(
  new JWTstrategy(
    {
      secretOrKey: "TOP_SECRET",
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter("secret_token"),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);
