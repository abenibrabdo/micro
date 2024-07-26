// components/AssignProjects.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Typography, CircularProgress, FormControl, InputLabel, Select, MenuItem, Snackbar, Alert } from '@mui/material';
import { fetchUsers } from '../redux/userSlice';
import { getProjects, assignProjectToUser } from '../redux/projectsSlice';

const AssignProjects = () => {
  const dispatch = useDispatch();
  const { users, loading: usersLoading, error: usersError } = useSelector((state) => state.users);
  const { projects, loading: projectsLoading, error: projectsError } = useSelector((state) => state.projects);
  const { loading: assignLoading, error: assignError } = useSelector((state) => state.projects);

  const [selectedUser, setSelectedUser] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(getProjects());
  }, [dispatch]);

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleProjectChange = (event) => {
    setSelectedProject(event.target.value);
  };

  const handleAssignProjects = () => {
    if (!selectedUser || !selectedProject) {
      setNotification({ open: true, message: 'Please select both a user and a project', severity: 'warning' });
      return;
    }

    dispatch(assignProjectToUser({ userId: selectedUser, projectId: selectedProject }))
      .then(() => {
        setNotification({ open: true, message: 'Project assigned successfully', severity: 'success' });
      })
      .catch(() => {
        setNotification({ open: true, message: 'Failed to assign project', severity: 'error' });
      });
  };

  const handleNotificationClose = () => {
    setNotification({ open: false, message: '', severity: 'success' });
  };

  return (
    <Box sx={{ pt: '80px', pb: '20px', height: '100vh', width: '100%' }}>
      <Typography variant="h6">Assign Project Stackhoder</Typography>
      {(usersLoading || projectsLoading || assignLoading) && <CircularProgress />}
      {usersError && <div>Error loading stackholder: {usersError}</div>}
      {projectsError && <div>Error loading projects: {projectsError}</div>}
      {assignError && <div>Error assigning project: {assignError}</div>}
      {!usersLoading && !projectsLoading && !assignLoading && (
        <>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="user-label">Select stackholder</InputLabel>
            <Select
              labelId="user-label"
              value={selectedUser}
              onChange={handleUserChange}
              displayEmpty
              renderValue={(selected) => {
                const user = users.find(u => u._id === selected);
                return user ? user.username : 'Select Stackholder';
              }}
            >
              {users.map((user) => (
                <MenuItem key={user._id} value={user._id}>
                  {user.username}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="project-label">Select Project</InputLabel>
            <Select
              labelId="project-label"
              value={selectedProject}
              onChange={handleProjectChange}
              displayEmpty
              renderValue={(selected) => {
                const project = projects.find(p => p._id === selected);
                return project ? project.title : 'Select Project';
              }}
            >
              {projects.map((project) => (
                <MenuItem key={project._id} value={project._id}>
                  {project.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" onClick={handleAssignProjects}>
            Assign Project
          </Button>
        </>
      )}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleNotificationClose}
      >
        <Alert onClose={handleNotificationClose} severity={notification.severity} sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AssignProjects;
