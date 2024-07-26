const express = require('express');
const router = express.Router();
const projectController = require('../controller/project');

// Create a new project
router.post('/', projectController.createProject);

// Get all projects
router.get('/', projectController.getAllProjects);

// Get a specific project
router.get('/:id', projectController.getProjectById);

// Update a project
router.put('/:id', projectController.updateProject);

// Delete a project
router.delete('/:id', projectController.deleteProject);

router.get('/counts/', projectController.getProjectCountByStatus);
router.get('/assigned-users-count', projectController.getAssignedUsersCount);

// Get projects by status
router.get('/status/:status', projectController.getProjectsByStatus);
module.exports = router;
