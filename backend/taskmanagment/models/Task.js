const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    status: { type: String, enum: ['in-progress', 'completed'], default: 'in-progress' },
    dueDate: { type: Date, required: true },
    description: { type: String, required: true }, 
    userRole: { type: String, enum: ['teammember', 'projectmanager'], required: true }, 
    projectTitle: { type: String, required: true },
    
}, { timestamps: true });

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;

//userId: { type: String, required: true },