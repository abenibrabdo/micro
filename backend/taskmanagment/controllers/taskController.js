const Task = require('../models/Task');

// Create a new task
exports.createTask = async (req, res) => {
   const { title,  dueDate, description, userRole, projectTitle } = req.body;  //, userId
    try {
        

        const task = new Task({title,  dueDate, description, userRole,  projectTitle});
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all tasks
exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getCount =  async (req, res) => {
    try {
        const taskCount = await Task.countDocuments();
        res.json({ count: taskCount });
    } catch (error) {
        res.status(500).json({ message: 'Error counting tasks', error });
    }
}

// Update task status
exports.updateTaskStatus = async (req, res) => {
    try {
        const { taskId, status } = req.body;
        const task = await Task.findByIdAndUpdate(taskId, { status }, { new: true });
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a task
exports.deleteTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const task = await Task.findByIdAndDelete(taskId);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
