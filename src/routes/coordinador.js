const express = require("express");
const router = express.Router();
const pool = require("../database");
const md_auth = require("../lib/authenticated");

router.get("/coordinador", [md_auth.ensureAuth], async (req, res) => {
  pool.query("SELECT * FROM Coordinador", async (err, rows) => {
    if (!err) {
      res.send({
        code: 200,
        success: "Coordinadores retornado con exito!",
        data: rows,
      });
      console.log("Coordinadores retornados con exito!");
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

router.get("/coordinador/:id", [md_auth.ensureAuth], async (req, res) => {
  const id = req.params.id;
  pool.query(
    "SELECT * FROM Coordinador WHERE id_Coordinador = ?",
    id,
    async (err, rows) => {
      if (!err) {
        res.send({
          code: 200,
          success: "Coordinador retornado con exito!",
          data: rows,
        });
        console.log("Coordinador retornado con exito!");
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

router.post("/coordinador/nuevo", [md_auth.ensureAuth], async (req, res) => {
  const { id_Convenio, nombre, apellido, cargo, email, telefono } = req.body;
  pool.query(
    "INSERT INTO Coordinador (Convenio_id_Convenio, nombre, apellido, cargo, email, telefono) VALUES (?,?,?,?,?,?)",
    [id_Convenio, nombre, apellido, cargo, email, telefono],
    async (err, rows) => {
      if (!err) {
        res.send({
          code: 200,
          success: "Coordinador nuevo ingresado exitosamente",
        });
        console.log("Coordinador retornado con exito!");
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

router.delete("/coordinador/:id", [md_auth.ensureAuth], async (req, res) => {
  const { id } = req.params;
  pool.query(
    "DELETE FROM Coordinador WHERE id_Coordinador = ?",
    [id],
    async (err, rows) => {
      if (!err) {
        res.send({
          code: 200,
          success: "Coordinador eliminado exitosamente",
        });
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

module.exports = router;
