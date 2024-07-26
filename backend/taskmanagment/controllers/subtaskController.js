const Subtask = require('../models/Subtask');

exports.createSubtask = async (req, res) => {
    try {
        const subtask = new Subtask(req.body);
        await subtask.save();
        res.status(201).json(subtask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllSubtasks = async (req, res) => {
    try {
        const subtasks = await Subtask.find().populate('taskId', ); //'title'
        res.json(subtasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all subtasks for a specific task
exports.getSubtasksByTaskId = async (req, res) => {
    try {
        const subtasks = await Subtask.find({ taskId: req.params.taskId });
        res.json(subtasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update subtask status
exports.updateSubtaskStatus = async (req, res) => {
    try {
        console.log(req.body);
        const { taskId, status } = req.body;
        const subtask = await Subtask.findByIdAndUpdate(taskId, { status }, { new: true });
        if (!subtask) return res.status(404).json({ message: 'Subtask not found' });
        res.json(subtask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a subtask
exports.deleteSubtask = async (req, res) => {
    try {
        const { subtaskId } = req.params;
        const subtask = await Subtask.findByIdAndDelete(subtaskId);
        if (!subtask) return res.status(404).json({ message: 'Subtask not found' });
        res.json({ message: 'Subtask deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
