const Project = require('../models/project');

// Create a new project
exports.createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate('assignedUsers', 'username email role'); // Populate user info
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get a specific project
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a project
exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a project
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (project) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get count of projects by status
exports.getProjectCountByStatus = async (req, res) => {
  try {
      const approvedProjectCount = await Project.countDocuments({ status: 'approved' });
      const pendingProjectCount = await Project.countDocuments({ status: 'pending' });
      const canceledProjectCount = await Project.countDocuments({ status: 'canceled' });
      const assignedProjectCount = await Project.countDocuments({ status: 'assigned' });

      res.json({
          approved: approvedProjectCount,
          pending: pendingProjectCount,
          canceled: canceledProjectCount,
          assigned: assignedProjectCount
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
};

// Get projects by status
exports.getProjectsByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const projects = await Project.find({ status });

    if (projects.length > 0) {
      res.status(200).json(projects);
    } else {
      res.status(404).json({ error: 'No projects found for the given status' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get number of assigned users for each project by project ID
exports.getAssignedUsersCount = async (req, res) => {
  const projectId = req.params.projectId;

  try {
    const counts = await Project.aggregate([
      {
        $match: { _id: mongoose.Types.ObjectId(projectId) } // Match by project ID
      },
      {
        $project: {
          title: 1,
          assignedUsersCount: { $size: '$assignedUsers' }
        }
      }
    ]);

    res.status(200).json(counts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
