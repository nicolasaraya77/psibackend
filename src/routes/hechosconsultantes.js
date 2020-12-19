const express = require("express");
const router = express.Router();
const pool = require("../database");
const md_auth = require("../lib/authenticated");

router.get("/hechosconsultantes", [md_auth.ensureAuth], async (req, res) => {
  pool.query("SELECT * FROM HechosConsultantes", async (err, rows) => {
    if (!err) {
      res.status(200).send({
        message: "hechosconsultantes retornados con exito!",
        rows,
      });
      console.log("hechosconsultantes retornados con exito!");
      console.log(rows);
    } else {
      res.send({
        code: 400,
        msg: "un error ha ocurrido",
      });
      console.log(err);
    }
  });
});

router.get(
  "/hechosconsultantes/:rut",
  [md_auth.ensureAuth],
  async (req, res) => {
    const rut = req.params.rut;
    pool.query(
      "SELECT * FROM HechosConsultantes WHERE Paciente_RUT = ?",
      rut,
      async (err, rows) => {
        if (!err) {
          res.status(200).send({
            message: "hechosconsultantes retornados con exito!",
            rows,
          });

          console.log("hechoconsultante retornado con exito!");
          console.log(rows);
        } else {
          res.send({
            code: 400,
            msg: "un error ha ocurrido",
          });
          console.log(err);
        }
      }
    );
  }
);

module.exports = router;
