const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/tipoinstitucion', isLoggedIn, async (req, res) => {
    pool.query('SELECT * FROM TipoInstitucion', async(err,rows) =>{
        if (!err) {
            res.send({
                code: 200,
                success: "Tipo de Instituciones retornados con exito!",
                data: rows
            });
            console.log("Tipo de Instituciones retornados con exito!");
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

router.get('/tipoinstitucion/:id', isLoggedIn, async (req, res) => {
    const id = req.params.id;
    pool.query('SELECT * FROM TipoInstitucion WHERE id_TipoInstitucion = ?', id ,async(err,rows) =>{
        if (!err) {
            res.send({
                code: 200,
                success: "Tipo de Institucion retornado con exito!",
                data: rows
            });
            console.log("Tipo de Institucion retornado con exito!");
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

router.post('/tipoinstitucion', isLoggedIn, async (req, res) => {
    const {id_TipoInstitucion, nombre} = req.body;
    pool.query('UPDATE TipoInstitucion SET nombre = (?) WHERE id_TipoInstitucion  = (?)',
    [nombre, id_TipoInstitucion],
    async(err,rows) =>{
        if (!err) {
            res.send({
                code: 200,
                success: "TipoInstitucion cambiado exitosamente",
            });
            console.log("TipoInstitucion cambiado con exito!");
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

router.post('/tipoinstitucion/nuevo', isLoggedIn, async (req, res) => {
    const {nombre} = req.body;
    pool.query('INSERT INTO TipoInstitucion (nombre) VALUES (?)', [nombre],
    async(err,rows) =>{
        if (!err) {
            res.send({
                code: 200,
                success: "Tipo de Institucion nuevo ingresado exitosamente",
            });
            console.log("Tipo de Institucion retornado con exito!");
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

router.delete('/tipoinstitucion/:id', isLoggedIn, async (req, res) => {
    const {id} = req.params;
    pool.query('DFELETE FROM TipoInstitucion WHERE id_TipoInstitucion = ?', [id] ,async(err,rows) =>{
        if (!err) {
            res.send({
                code: 200,
                success: "Tipo de Institucion eliminado exitosamente",
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