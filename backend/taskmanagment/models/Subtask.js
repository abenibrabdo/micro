const mongoose = require('mongoose');

const SubtaskSchema = new mongoose.Schema({
    taskId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Task' },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: [ 'in-progress', 'completed'], default: 'in-progress' },
    dueDate: { type: Date, required: true },
}, { timestamps: true });

const Subtask = mongoose.model('Subtask', SubtaskSchema);
module.exports = Subtask;
