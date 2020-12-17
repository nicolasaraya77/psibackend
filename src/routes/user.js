const express = require("express");
const router = express.Router();
const pool = require("../database");
const md_auth = require("../lib/authenticated");

router.get("/usuario", [md_auth.ensureAuth], async (req, res) => {
  //const { email } = req.params;
  pool.query(
    "SELECT * FROM Usuario ",

    async (err, rows) => {
      if (!err) {
        res.status(200).send({ rows });
        console.log("Usuario retornado con exito!");
        console.log(rows);
      } else {
        res
          .status(404)
          .send({ message: "No se ha encontrado ningun usuario." });
        console.log(err);
      }
    }
  );
});

//retorna el usuario por id
router.get("/usuario/:id", [md_auth.ensureAuth], async (req, res) => {
  const id = req.params.id;
  pool.query(
    "SELECT * FROM Usuario WHERE id = ? ",
    id,

    async (err, rows) => {
      if (!err) {
        res.status(200).send({ rows });
        console.log("Usuario retornado con exito!");
        console.log(rows);
      } else {
        res
          .status(404)
          .send({ message: "No se ha encontrado ningun usuario." });
        console.log(err);
      }
    }
  );
});

router.put("/usuario/:id", [md_auth.ensureAuth], async (req, res) => {
  const {
    id_Usuario,
    TipoUsuario_id_TipoUsuario,
    nombre,
    nombre_social,
    email,
    password,
  } = req.body;
  pool.query(
    "UPDATE Usuario SET TipoUsuario_id_TipoUsuario = (?), nombre = (?), nombre_social = (?), email = (?), password = (?) WHERE id_Usuario  = (?)",
    [
      TipoUsuario_id_TipoUsuario,
      nombre,
      nombre_social,
      email,
      password,
      id_Usuario,
    ],
    async (err, rows) => {
      if (!err) {
        res.send({
          code: 200,
          success: "Usuario cambiado exitosamente",
        });
        console.log("Usuario cambiado con exito!");
        console.log(rows);
      } else {
        res.send({
          code: 400,
          failed: "un error ha ocurrido",
        });
        console.log(err);
      }
    }
  );
});

router.get("/tipousuario", async (req, res) => {
  pool.query("SELECT * FROM TipoUsuario", async (err, rows) => {
    if (!err) {
      res.send({
        code: 200,
        success: "Tipos de usuario retornados con exito!",
        rows,
      });
      console.log("Tipos de usuario retornado con exito!");
      console.log(rows);
    } else {
      res.send({
        code: 400,
        failed: "un error ha ocurrido",
      });
      console.log(err);
    }
  });
});

module.exports = router;
