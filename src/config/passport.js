const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const pool = require("../database");
/*
passport.use(
  "local.signup",
  new LocalStrategy(async (req, email, password, done) => {
    const { nombre, nombre_social } = req.body;
    const encryptedPassword = await bcrypt.hash(password, saltRounds);
    const users = {
      email,
      password: encryptedPassword,
      nombre,
      nombre_social,
      TipoUsuario_id_TipoUsuario: 1,
    };

    const result = await pool.query(
      "INSERT INTO Usuario SET ?",
      users,
      function (error, results, fields) {
        if (error) {
          res.send({
            code: 400,
            failed: "un error ha ocurrido",
          });
        } else {
          res.send({
            code: 200,
            success: "usuario registrado exitosamente",
          });
        }
      }
    );

    return done(null, users);
  })
);
*/

passport.use(
  "local.signup",
  new LocalStrategy(async (req, done) => {
    const { nombre, email, password, nombre_social } = req.body;

    let newUser = {
      nombre,
      nombre_social,
      email,
      password,
      TipoUsuario_id_TipoUsuario: 1,
    };

    newUser.password = await bcrypt.hash(password, 10);
    // Saving in the Database
    const result = pool.query("INSERT INTO Usuario SET ? ", newUser);
    newUser.id = result.insertId;
    return done(null, newUser);
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const rows = await pool.query("SELECT * FROM Usuario WHERE id = ?", [id]);
  done(null, rows[0]);
});
