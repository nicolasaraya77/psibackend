const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/paciente', isLoggedIn, async (req, res) => {
    pool.query('SELECT * FROM Paciente', async(err,rows) =>{
        if (!err) {
            res.json(rows);
            console.log("Paciente retornados con exito!");
            console.log(rows)
        }
        else {
            res.send({
                code: 400,
                failed: "un error ha ocurrido",
            });
            console.log(err);
        }
    });
});

router.get('/paciente/:rut', isLoggedIn, async (req, res) => {
    const rut = req.params.rut;
    pool.query('SELECT * FROM Paciente WHERE RUT = ?', rut ,async(err,rows) =>{
        if (!err) {
            res.json(rows);
            console.log("Paciente retornado con exito!");
            console.log(rows)
        }
        else {
            res.send({
                code: 400,
                failed: "un error ha ocurrido",
            });
            console.log(err);
        }
    });
});

router.post('/paciente/nuevo', isLoggedIn, async (req, res) => {
    const {rut, nombre, nombre_social, pronombre, genero, sexo, apellido, id_PrevisionSalud, fecha_nacimiento} = req.body;
    pool.query('INSERT INTO Paciente (RUT, nombre, nombre_social, pronombre, genero, sexo, apellido, PrevisionSalud_id_PrevisionSalud, fecha_nacimiento) VALUES (?,?,?,?,?,?,?,?,?)', [rut, nombre, nombre_social, pronombre, genero, sexo, apellido, id_PrevisionSalud, new Date(fecha_nacimiento)],
    async(err,rows) =>{
        if (!err) {
            res.send({
                code: 200,
                success: "Paciente nuevo ingresado exitosamente",
            });
            console.log("Paciente retornado con exito!");
            console.log(rows)
        }
        else {
            res.send({
                code: 400,
                failed: "un error ha ocurrido",
            });
            console.log(err);
        }
    });
});

router.delete('/paciente/:rut', isLoggedIn, async (req, res) => {
    const {rut} = req.params;
    pool.query('DFELETE FROM Paciente WHERE RUT = ?', [rut] ,async(err,rows) =>{
        if (!err) {
            res.send({
                code: 200,
                success: "Paciente eliminado exitosamente",
            });
        }
        else {
            res.send({
                code: 400,
                failed: "un error ha ocurrido",
            });
            console.log(err);
        }
    });
});


module.exports = router;