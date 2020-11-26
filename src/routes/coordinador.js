const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/coordinador', isLoggedIn, async (req, res) => {
    pool.query('SELECT * FROM Coordinador', async(err,rows) =>{
        if (!err) {
            res.json(rows);
            console.log("Coordinadores retornados con exito!");
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

router.get('/coordinador/:id', isLoggedIn, async (req, res) => {
    const id = req.params.id;
    pool.query('SELECT * FROM Coordinador WHERE id_Coordinador = ?', id ,async(err,rows) =>{
        if (!err) {
            res.json(rows);
            console.log("Coordinador retornado con exito!");
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

router.post('/coordinador/nuevo', isLoggedIn, async (req, res) => {
    const {id_Convenio, nombre, apellido, cargo, email, telefono} = req.body;
    pool.query('INSERT INTO Coordinador (Convenio_id_Convenio, nombre, apellido, cargo, email, telefono) VALUES (?,?,?,?,?,?)', [id_Convenio, nombre, apellido, cargo, email, telefono],
    async(err,rows) =>{
        if (!err) {
            res.send({
                code: 200,
                success: "Coordinador nuevo ingresado exitosamente",
            });
            console.log("Coordinador retornado con exito!");
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

router.delete('/coordinador/:id', isLoggedIn, async (req, res) => {
    const {id} = req.params;
    pool.query('DFELETE FROM Coordinador WHERE id_Coordinador = ?', [id] ,async(err,rows) =>{
        if (!err) {
            res.send({
                code: 200,
                success: "Coordinador eliminado exitosamente",
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