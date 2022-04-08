const express = require('express');
const router = express.Router();
const users = require('../controllers/users');

// Login and register routes
router.get('/', users.userAction);
router.post('/login', users.userAction);
router.post('/register', users.userAction);

module.exports = router;