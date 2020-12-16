const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/prevision', isLoggedIn, async (req, res) => {
    pool.query('SELECT * FROM PrevisionSalud', async(err,rows) =>{
        if (!err) {
            res.send({
                code: 200,
                success: "Previsiones retornadas con exito!",
                data: rows
            });
            console.log("Previsiones retornadas con exito!");
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


router.post('/prevision', isLoggedIn, async (req, res) => {
    const {id_PrevisionSalud, nombre} = req.body;
    pool.query('UPDATE PrevisionSalud SET nombre = (?) WHERE id_PrevisionSalud = (?)',
    [nombre, id_PrevisionSalud],
    async(err,rows) =>{
        if (!err) {
            res.send({
                code: 200,
                success: "Prevision cambiada exitosamente",
            });
            console.log("Prevision cambiada con exito!");
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

router.post('/prevision/nuevo', isLoggedIn, async (req, res) => {
    const {nombre} = req.body;
    pool.query('INSERT INTO PrevisionSalud (nombre) VALUES (?)', [nombre],
    async(err,rows) =>{
        if (!err) {
            res.send({
                code: 200,
                success: "Prevision nueva ingresada exitosamente",
            });
            console.log("Prevision ingresada con exito!");
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

router.delete('/prevision/:id', isLoggedIn, async (req, res) => {
    const {id} = req.params;
    pool.query('DFELETE FROM PrevisionSalud WHERE id_PrevisionSalud = ?', [id] ,async(err,rows) =>{
        if (!err) {
            res.send({
                code: 200,
                success: "Prevision eliminada exitosamente",
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