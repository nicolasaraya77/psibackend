const express = require('express');
const router = express.Router();

const passport = require('passport');
const { isLoggedIn } = require('../lib/auth');
const passportconfig = require('../lib/passportconfig');
passportconfig(passport);

router.post('/login', (req, res, next) => {
    passport.authenticate('local-login', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
});

router.post('/signup',
    passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })
);

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/login');
  });

module.exports = router;