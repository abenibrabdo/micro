const express = require('express');
const { createSubtask, getSubtasksByTaskId, updateSubtaskStatus, deleteSubtask, getAllSubtasks } = require('../controllers/subtaskController');

const router = express.Router();

router.post('/subtasks', createSubtask);
router.get('/subtasks', getAllSubtasks);
router.get('/subtasks/task/:taskId', getSubtasksByTaskId);
router.put('/subtasks/status', updateSubtaskStatus);
router.delete('/subtasks/:subtaskId', deleteSubtask);

module.exports = router;
