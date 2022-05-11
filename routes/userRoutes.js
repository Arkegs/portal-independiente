const express = require('express');
const router = express.Router({ mergeParams: true });
const users = require('../controllers/users');
const { isLoggedIn } = require('../middleware');

// CRUD for User
router.route('/:username')
    .get(users.showUser)
    .delete(isLoggedIn, users.deleteUser)
    .put(isLoggedIn, users.updateUser);

module.exports = router;
