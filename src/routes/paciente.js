const express = require("express");
const router = express.Router();
const pool = require("../database");
const md_auth = require("../lib/authenticated");

router.get("/paciente", [md_auth.ensureAuth], async (req, res) => {
  pool.query("SELECT * FROM Paciente", async (err, rows) => {
    if (!err) {
      res.send({
        code: 200,
        success: "Pacientes retornados con exito!",
        rows,
      });
      console.log("Pacientes retornados con exito!");
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

router.get("/paciente/:rut", [md_auth.ensureAuth], async (req, res) => {
  const rut = req.params.rut;
  pool.query("SELECT * FROM Paciente WHERE RUT = ?", rut, async (err, rows) => {
    if (!err) {
      res.send({
        code: 200,
        success: "Paciente retornado con exito!",
        data: rows,
      });
      console.log("Paciente retornado con exito!");
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

router.post("/paciente/nuevo", [md_auth.ensureAuth], async (req, res) => {
  const {
    rut,
    nombre,
    nombre_social,
    pronombre,
    genero,
    sexo,
    apellido,
    id_PrevisionSalud,
    fecha_nacimiento,
    fecha_ingreso,
  } = req.body;
  pool.query(
    "INSERT INTO Paciente (RUT, nombre, nombre_social, pronombre, genero, sexo, apellido, PrevisionSalud_id_PrevisionSalud, fecha_nacimiento,fecha_ingreso) VALUES (?,?,?,?,?,?,?,?,?,?)",
    [
      rut,
      nombre,
      nombre_social,
      pronombre,
      genero,
      sexo,
      apellido,
      id_PrevisionSalud,
      new Date(fecha_nacimiento),
      new Date(fecha_ingreso),
    ],
    async (err, rows) => {
      if (!err) {
        res.send({
          code: 200,
          success: "Paciente nuevo ingresado exitosamente",
        });
        console.log("Paciente retornado con exito!");
        console.log(rows);
      } else {
        res.send({
          code: 400,
          failed: "Paciente ya existe",
        });
        console.log(err);
      }
    }
  );
});

router.delete("/paciente/:rut", [md_auth.ensureAuth], async (req, res) => {
  const { rut } = req.params;
  pool.query("DELETE FROM Paciente WHERE RUT = ?", [rut], async (err, rows) => {
    if (!err) {
      res.send({
        code: 200,
        success: "Paciente eliminado exitosamente",
      });
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
