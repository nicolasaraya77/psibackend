const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/hechosconsultantes', isLoggedIn, async (req, res) => {
    pool.query('SELECT * FROM HechosConsultantes', async(err,rows) =>{
        if (!err) {
            res.json(rows);
            console.log("hechosconsultantes retornados con exito!");
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

router.get('/hechosconsultantes/:rut', isLoggedIn, async (req, res) => {
    const rut = req.params;
    pool.query('SELECT * FROM HechosConsultantes WHERE Paciente_RUT = ?', rut ,async(err,rows) =>{
        if (!err) {
            res.json(rows);
            console.log("hechoconsultante retornado con exito!");
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


module.exports = router;