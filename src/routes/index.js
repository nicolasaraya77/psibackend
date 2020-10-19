const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../lib/auth');

router.get('/', isLoggedIn, async (req, res) => {
    res.send('Hello world! Successfully Authenticated');
});

router.get('/login', async (req, res) => {
    res.send('LogIn instance');
});

module.exports = router;