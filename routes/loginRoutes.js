const express = require('express');
const passport = require('passport');
const router = express.Router({ mergeParams: true });
const users = require('../controllers/users');
const { isLoggedIn } = require('../middleware');

// Login and register routes
router.post('/login', passport.authenticate('local'), users.loginUser);
router.post('/register', users.registerUser);
router.post('/logout', users.logoutUser);
router.get('/logged', isLoggedIn, (req, res, next) => {console.log(req.user); req.user ? res.send("Logueado conchetumare") : res.send("No estas logueado culiao");});
router.get('/sessionCheck', isLoggedIn, (req, res, next) => {console.log(req.user);});

module.exports = router;