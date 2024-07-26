const express = require('express');
const router = express.Router();
const userController = require('../controller/user');

// Create a new user
router.post('/', userController.createUser);

// Get all users
router.get('/', userController.getAllUsers);

// Get a specific user
router.get('/:id', userController.getUserById);

// Update a user
router.put('/:id', userController.updateUser);

// Delete a user
router.delete('/:id', userController.deleteUser);

// Assign a project to a user
router.post('/assign/:userId/:projectId', userController.assignProjectToUser);

// Remove a project assignment from a user
router.delete('/remove/:userId/:projectId', userController.removeProjectFromUser);




module.exports = router;
