const express = require('express');
const router = express.Router();
const users = require('../controllers/users');

// CRUD for User
router.route('/:username')
    .get(users.userAction)
    .delete(users.userAction)
    .put(users.userAction);

module.exports = router;
