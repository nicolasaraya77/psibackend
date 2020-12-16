const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/usuario/:email', isLoggedIn, async (req, res) => {
    const {email} = req.params;
    pool.query('SELECT * FROM Usuario WHERE email = (?)', [email], async(err,rows) =>{
        if (!err) {
            res.send({
                code: 200,
                success: "Usuario retornado con exito!",
                data: rows
            });
            console.log("Usuario retornado con exito!");
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

router.post('/usuario', isLoggedIn, async (req, res) => {
    const {id_Usuario, TipoUsuario_id_TipoUsuario, nombre, nombre_social, email, password} = req.body;
    pool.query('UPDATE Usuario SET TipoUsuario_id_TipoUsuario = (?), nombre = (?), nombre_social = (?), email = (?), password = (?) WHERE id_Usuario  = (?)',
    [TipoUsuario_id_TipoUsuario, nombre, nombre_social, email, password, id_Usuario],
    async(err,rows) =>{
        if (!err) {
            res.send({
                code: 200,
                success: "Usuario cambiado exitosamente",
            });
            console.log("Usuario cambiado con exito!");
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

router.delete('/usuario/:id', isLoggedIn, async (req, res) => {
    const {id} = req.params;
    pool.query('DFELETE FROM Usuario WHERE id_Usuario = ?', [id] ,async(err,rows) =>{
        if (!err) {
            res.send({
                code: 200,
                success: "Usuario eliminado exitosamente",
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
})

router.get('/tipousuario', isLoggedIn, async (req, res) => {
    pool.query('SELECT * FROM TipoUsuario', async(err,rows) =>{
        if (!err) {
            res.send({
                code: 200,
                success: "Tipos de usuario retornados con exito!",
                data: rows
            });
            console.log("Tipos de usuario retornado con exito!");
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

router.post('/tipousuario/nuevo', isLoggedIn, async (req, res) => {
    const {nombre} = req.body;
    pool.query('INSERT INTO TipoUsuario (nombre) VALUES (?)', [nombre],
    async(err,rows) =>{
        if (!err) {
            res.send({
                code: 200,
                success: "Tipo de usuario nuevo ingresado exitosamente",
            });
            console.log("Tipo de usuario retornado con exito!");
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


router.post('/tipousuario', isLoggedIn, async (req, res) => {
    const {id_TipoUsuario, nombre} = req.body;
    pool.query('UPDATE TipoUsuario SET nombre = (?) WHERE id_TipoUsuario = (?)',
    [nombre, id_TipoUsuario],
    async(err,rows) =>{
        if (!err) {
            res.send({
                code: 200,
                success: "Tipo de usuario cambiado exitosamente",
            });
            console.log("Tipo de usuario cambiado con exito!");
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

router.delete('/tipousuario/:id', isLoggedIn, async (req, res) => {
    const {id} = req.params;
    pool.query('DFELETE FROM TipoUsuario WHERE id_TipoUsuario = ?', [id] ,async(err,rows) =>{
        if (!err) {
            res.send({
                code: 200,
                success: "Tipo de usuario eliminado exitosamente",
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