const express = require("express");
const router = express.Router();
const pool = require("../database");
const md_auth = require("../lib/authenticated");

router.get("/estado", [md_auth.ensureAuth], async (req, res) => {
  pool.query("SELECT * FROM Estado", async (err, rows) => {
    if (!err) {
      res.send({
        code: 200,
        success: "Estado retornados con exito!",
        rows,
      });
      console.log("Estado retornados con exito!");
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

router.get("/estado/:id", [md_auth.ensureAuth], async (req, res) => {
  const id = req.params.id;
  pool.query(
    "SELECT * FROM Estado WHERE id_Estado = ?",
    id,
    async (err, rows) => {
      if (!err) {
        res.send({
          code: 200,
          success: "Estado retornado con exito!",
          data: rows,
        });
        console.log("Estado retornado con exito!");
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

router.put("/estado/:id", [md_auth.ensureAuth], async (req, res) => {
  const { id_Estado, nombre } = req.body;
  pool.query(
    "UPDATE Estado SET nombre = (?) WHERE id_Estado = (?)",
    [nombre, id_Estado],
    async (err, rows) => {
      if (!err) {
        res.send({
          code: 200,
          success: "Estado cambiado exitosamente",
        });
        console.log("Estado cambiado con exito!");
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

router.post("/estado/nuevo", [md_auth.ensureAuth], async (req, res) => {
  const { nombre } = req.body;
  pool.query(
    "INSERT INTO Estado (nombre) VALUES (?)",
    [nombre],
    async (err, rows) => {
      if (!err) {
        res.send({
          code: 200,
          success: "Estado nuevo ingresado exitosamente",
        });
        console.log("Estado retornado con exito!");
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

router.delete("/estado/:id", [md_auth.ensureAuth], async (req, res) => {
  const { id } = req.params;
  pool.query(
    "DELETE FROM Estado WHERE id_Estado = ?",
    [id],
    async (err, rows) => {
      if (!err) {
        res.send({
          code: 200,
          success: "Estado eliminado exitosamente",
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
