const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/derivacion', isLoggedIn, async (req, res) => {
    pool.query('SELECT * FROM Derivacion', async(err,rows) =>{
        if (!err) {
            res.json(rows);
            console.log("Derivaciones retornadas con exito!");
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

router.get('/derivacion/:id', isLoggedIn, async (req, res) => {
    const id = req.params.id;
    pool.query('SELECT * FROM Derivacion WHERE id_Derivacion = ?', id ,async(err,rows) =>{
        if (!err) {
            res.json(rows);
            console.log("Derivacion retornada con exito!");
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

router.post('/derivacion/nuevo', isLoggedIn, async (req, res) => {
    const {id_Motivo, RUT, id_Coordinador} = req.body;
    pool.query('INSERT INTO Derivacion (Motivo_id_Motivo, Paciente_RUT, Coordinador_id_Coordinador) VALUES (?,?,?)', [id_Motivo, RUT, id_Coordinador],
    async(err,rows) =>{
        if (!err) {
            res.send({
                code: 200,
                success: "Derivacion nueva ingresada exitosamente",
            });
            console.log("Derivacion retornada con exito!");
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

router.delete('/derivacion/:id', isLoggedIn, async (req, res) => {
    const {id} = req.params;
    pool.query('DFELETE FROM Derivacion WHERE id_Derivacion = ?', [id] ,async(err,rows) =>{
        if (!err) {
            res.send({
                code: 200,
                success: "Derivacion eliminada exitosamente",
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