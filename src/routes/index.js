const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../lib/auth');

router.get('/', isLoggedIn, async (req, res) => {
    res.send({
        code: 200,
        success: "Hello world! Successfully Authenticated",
    });
});

router.get('/login', async (req, res) => {
    var aux = req.isAuthenticated();
    res.send({ 
        state: aux, 
        context : 'isAunthenticated function'
    });
});

module.exports = router;