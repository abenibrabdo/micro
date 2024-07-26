const express = require('express');
const { createTask, getAllTasks, updateTaskStatus, deleteTask, getCount } = require('../controllers/taskController');

const router = express.Router();

router.post('/tasks', createTask);
router.get('/tasks', getAllTasks);
router.get('/tasks/count', getCount);
router.put('/tasks/status', updateTaskStatus);
router.delete('/tasks/:taskId', deleteTask);

module.exports = router;


