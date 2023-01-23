const express = require('express');
const router = express.Router();
const users = require('../controllers/user.controller');

// Get all users
router.get('/details', users.getUsers);

// Get a single user
router.get('/:id', users.getUserById);

// Add a new user
router.post('/register', users.addUser);

// Update a user
router.put('/:id', users.updateUser);

// login user
router.post('/login', users.login)

// Soft delete a user
router.delete('/:id', users.deleteUser);

module.exports = router;
