const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  budget: {
    type: String,
    required: true,
  },

  resource: {
    type: String,
    required: true,
  },
  locationLat: {
    type: String,
    required: true,
  },
 locationLong : {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
  },
  status: {
    type: String,
    required: true,
    enum: ['approved', 'pending', 'canceled', 'assigned','completed','in-progress'], // Allow only these values
    default: 'pending' // Optional: Set a default value
  },
  assignedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Project', projectSchema);
