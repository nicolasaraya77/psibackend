const passport = require("passport");
const authCtrl = {};

authCtrl.signUp = passport.authenticate("local.signup");

authCtrl.signIn = passport.authenticate("local.signin");

module.exports = authCtrl;

/*
const bcrypt = require("bcryptjs");
const pool = require("../database");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const saltRounds = 10;


exports.register = async function (req, res) {
  const { email, password, nombre, nombre_social } = req.body;
  const encryptedPassword = await bcrypt.hash(password, saltRounds);
  const users = {
    email,
    password: encryptedPassword,
    nombre,
    nombre_social,
    TipoUsuario_id_TipoUsuario: 1,
  };
  console.log(users);
};

exports.login = async function (req, res) {
  const { email, password } = req.body;

  pool.query(
    "SELECT * FROM Usuario WHERE email = ?",
    [email],
    async function (error, results, fields) {
      if (error) {
        res.send({
          code: 400,
          failed: "un error ha ocurrido",
        });
      } else {
        if (results.length > 0) {
          const comparision = await bcrypt.compare(
            password,
            results[0].password
          );
          if (comparision) {
            res.send({
              code: 200,
              success: "inicio de sesión exitoso",
            });
          } else {
            res.send({
              code: 204,
              success: "Correo o contraseña no son iguales",
            });
          }
        } else {
          res.send({
            code: 206,
            success: "correo no existe",
          });
        }
      }
    }
  );
};

//insert into Usuario (TipoUsuario_id_TipoUsuario,email,password,nombre,nombre_social) values (1,"nicolasarayac@mail.udp.cl","hola","nicolas","nicolas");
*/
