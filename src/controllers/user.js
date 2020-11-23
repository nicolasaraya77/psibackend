const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "mydb",
  port: 3306,
});
connection.connect(function (err) {
  if (err) {
    console.error("error de conexión: " + err.stack);
    return;
  }
  // Uncomment below lines for first time to create a table in database
  // const sql = "CREATE TABLE users (email constCHAR(255), password constCHAR(255))";
  // connection.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log("Table created");
  // });
  console.log("conectando con id: " + connection.threadId);
});
exports.register = async function (req, res) {
  console.log(req.body);
  const password = req.body.password;
  const encryptedPassword = await bcrypt.hash(password, saltRounds);

  const users = {
    email: req.body.email,
    password: encryptedPassword,
    nombre: req.body.nombre,
    nombre_social: req.body.nombre_social,
    TipoUsuario_id_TipoUsuario: 1,
  };
  console.log(users);

  connection.query(
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
};

exports.login = async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  connection.query(
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
