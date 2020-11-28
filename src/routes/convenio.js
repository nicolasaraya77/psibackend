const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/convenio', isLoggedIn, async (req, res) => {
    pool.query('SELECT * FROM Convenio', async(err,rows) =>{
        if (!err) {
            res.send({
                code: 200,
                success: "Convenios retornados con exito!",
                data: rows
            });
            console.log("Convenios retornados con exito!");
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

router.get('/convenio/:id', isLoggedIn, async (req, res) => {
    const id = req.params.id;
    pool.query('SELECT * FROM Convenio WHERE id_Convenio = ?', id ,async(err,rows) =>{
        if (!err) {
            res.send({
                code: 200,
                success: "Convenio retornado con exito!",
                data: rows
            });
            console.log("Convenio retornado con exito!");
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

router.post('/convenio/nuevo', isLoggedIn, async (req, res) => {
    const {id_TipoInstitucion, nombre, fecha_inicio, estado} = req.body;
    pool.query('INSERT INTO Convenio (TipoInstitucion_id_Tipoinstitucion, nombre, fecha_inicio, estado) VALUES (?,?,?,?)', [id_TipoInstitucion, nombre, new Date(fecha_inicio), estado],
    async(err,rows) =>{
        if (!err) {
            res.send({
                code: 200,
                success: "Convenio nuevo ingresado exitosamente",
            });
            console.log("Convenio retornado con exito!");
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

router.delete('/convenio/:id', isLoggedIn, async (req, res) => {
    const {id} = req.params;
    pool.query('DFELETE FROM Convenio WHERE id_Convenio = ?', [id] ,async(err,rows) =>{
        if (!err) {
            res.send({
                code: 200,
                success: "Convenio eliminado exitosamente",
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