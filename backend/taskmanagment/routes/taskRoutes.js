const express = require('express');
const { createTask, getAllTasks, updateTaskStatus, deleteTask } = require('../controllers/taskController');

const router = express.Router();

router.post('/tasks', createTask);
router.get('/tasks', getAllTasks);
router.put('/tasks/status', updateTaskStatus);
router.delete('/tasks/:taskId', deleteTask);

module.exports = router;
