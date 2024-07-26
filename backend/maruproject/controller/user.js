const User = require('../models/user');
const Project = require('../models/project');

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate('assignedProjects');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific user
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('assignedProjects');
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (user) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Assign a project to a user
exports.assignProjectToUser = async (req, res) => {
  try {
    const { userId, projectId } = req.params;

    // Find the user and project
    const user = await User.findById(userId);
    const project = await Project.findById(projectId);

    if (!user || !project) {
      return res.status(404).json({ error: 'User or Project not found' });
    }

    // Assign project to user
    user.assignedProjects.push(projectId);
    await user.save();

    // Assign user to project
    project.assignedUsers.push(userId);
    await project.save();

    res.status(200).json({ user, project });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove a project assignment from a user
exports.removeProjectFromUser = async (req, res) => {
  try {
    const { userId, projectId } = req.params;

    // Find the user and project
    const user = await User.findById(userId);
    const project = await Project.findById(projectId);

    if (!user || !project) {
      return res.status(404).json({ error: 'User or Project not found' });
    }

    // Remove project from user
    user.assignedProjects = user.assignedProjects.filter(id => id.toString() !== projectId.toString());
    await user.save();

    // Remove user from project
    project.assignedUsers = project.assignedUsers.filter(id => id.toString() !== userId.toString());
    await project.save();

    res.status(200).json({ user, project });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
