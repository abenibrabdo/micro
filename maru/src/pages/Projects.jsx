// components/Projects.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  TextField,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Snackbar,
  Alert,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import { FiPlus, FiEdit, FiEye, FiTrash } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { getProjects, editProject, removeProject } from '../redux/projectsSlice';
import MapView from './map';
const Projects = () => {
  const dispatch = useDispatch();
  const { projects, loading, error } = useSelector((state) => state.projects);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  const [showMap, setShowMap] = useState(false);

  const handleButtonClick = () => {
    setShowMap(true);
  };
  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(removeProject(id))
      .then(() => {
        setNotification({ open: true, message: 'Project deleted successfully', severity: 'success' });
      })
      .catch(() => {
        setNotification({ open: true, message: 'Failed to delete project', severity: 'error' });
      });
    setOpenDelete(false);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleViewOpen = (project) => {
    setSelectedProject(project);
    setOpenView(true);
  };

  const handleViewClose = () => {
    setOpenView(false);
    setSelectedProject(null);
  };

  const handleEditOpen = (project) => {
    setSelectedProject(project);
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
    setSelectedProject(null);
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updatedProject = {
      title: formData.get('title'),
      budget: formData.get('budget'),
      resource: formData.get('resource'),
      locationLat: formData.get('locationLat'),
      locationLong: formData.get('locationLong'),
      description: formData.get('description'),
      startDate: formData.get('startDate'),
      endDate: formData.get('endDate'),
      status: formData.get('status'),
    };

    dispatch(editProject({ id: selectedProject._id, updatedProject }))
      .then(() => {
        setNotification({ open: true, message: 'Project updated successfully', severity: 'success' });
      })
      .catch(() => {
        setNotification({ open: true, message: 'Failed to update project', severity: 'error' });
      });

    setOpenEdit(false);
    setSelectedProject(null);
  };

  const handleDeleteOpen = (project) => {
    setSelectedProject(project);
    setOpenDelete(true);
  };

  const handleDeleteClose = () => {
    setOpenDelete(false);
    setSelectedProject(null);
  };

  const handleNotificationClose = () => {
    setNotification({ open: false, message: '', severity: 'success' });
  };

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    { field: 'title', headerName: 'Project Title', width: 200 },
    { field: 'budget', headerName: ' Project Budget', width: 150 },
    { field: 'resource', headerName: 'Resource', width: 200 },
    {
      field: 'startDate',
      headerName: 'Start Date',
      width: 200,
      renderCell: (params) => (
        <span style={{ color: 'black' }}>
          {params.value ? params.value.substring(0, 10) : ''}
        </span>
      ),
    },
    {
      field: 'endDate',
      headerName: 'End Date',
      width: 200,
      renderCell: (params) => (
        <span style={{ color: 'black' }}>
          {params.value ? params.value.substring(0, 10) : ''}
        </span>
      ),
    },
    { field: 'status', headerName: 'Status', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 300,
      renderCell: (params) => (
        <Box display="flex" justifyContent="space-between" width="100%">
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleEditOpen(params.row)}
            style={{ borderRadius: '20px' }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="info"
            onClick={() => handleViewOpen(params.row)}
            style={{ borderRadius: '20px' }}
          >
            View
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDeleteOpen(params.row)}
            style={{ borderRadius: '20px' }}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Box sx={{ pt: '80px', pb: '20px', height: '100vh', width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px',
        }}
      >
        <Typography variant="h6">Projects</Typography>
        <Link to="/projects/add" style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<FiPlus />}
            sx={{ borderRadius: '20px' }}
          >
            Add Project
          </Button>
        </Link>
      </Box>
      <TextField
        label="Search Projects"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearch}
        sx={{ marginBottom: '16px' }}
      />
      <DataGrid
        rows={filteredProjects}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5, 10, 20]}
        checkboxSelection
        disableSelectionOnClick
        autoHeight
        getRowId={(row) => row._id}
      />

<Dialog open={openView} onClose={handleViewClose}>
        <DialogTitle>Project Details</DialogTitle>
        <DialogContent>
          {selectedProject && (
            <DialogContentText>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1"><strong>#:</strong> {selectedProject._id}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1"><strong>Project Title:</strong> {selectedProject.title}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1"><strong>Project Budget:</strong> {selectedProject.budget}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1"><strong>Resource:</strong> {selectedProject.resource}</Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="body1"><strong>Description:</strong> {selectedProject.description}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1"><strong>Start Date:</strong> {new Date(selectedProject.startDate).toLocaleDateString()}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1"><strong>End Date:</strong> {new Date(selectedProject.endDate).toLocaleDateString()}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1"><strong>Status:</strong> {selectedProject.status}</Typography>
                </Grid>
                <Grid item xs={12}>
                <Typography variant="body1">
                  <strong>Assigned stackholder:</strong>
                </Typography>
                {selectedProject.assignedUsers.length > 0 ? (
                  <ul>
                    {selectedProject.assignedUsers.map(user => (
                      <li key={user._id}>
                        <Typography variant="body2">
                          <strong>Username:</strong> {user.username} <br />
                          <strong>Email:</strong> {user.email} <br />
                          <strong>Role:</strong> {user.role}
                        </Typography>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Typography variant="body2">No Stackehoder assigned</Typography>
                )}
              </Grid>
              </Grid>
            </DialogContentText>

          )}
        </DialogContent>
        <div style={{ padding: '20px' }}>
      <h1> project Location </h1>
      <button onClick={handleButtonClick} style={{ padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>
        Show Map
      </button>

      {showMap &&  <MapView latitude={selectedProject.locationLat} longitude={selectedProject.locationLong} />}
    </div>

        <DialogActions>
          <Button onClick={handleViewClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEdit} onClose={handleEditClose}>
        <DialogTitle>Edit Project</DialogTitle>
        <form onSubmit={handleEditSubmit}>
          <DialogContent>
            {selectedProject && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="title"
                    label="Project Title"
                    variant="outlined"
                    defaultValue={selectedProject.title}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="budget"
                    label="Project Budget"
                    variant="outlined"
                    defaultValue={selectedProject.budget}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="resource"
                    label="Resource"
                    variant="outlined"
                    defaultValue={selectedProject.resource}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="locationLat"
                    label="Latitude"
                    variant="outlined"
                    defaultValue={selectedProject.locationLat}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="locationLong"
                    label="Longitude"
                    variant="outlined"
                    defaultValue={selectedProject.locationLong}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="description"
                    label="Description"
                    variant="outlined"
                    defaultValue={selectedProject.description}
                    fullWidth
                    multiline
                    rows={4}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="startDate"
                    label="Start Date"
                    type="date"
                    variant="outlined"
                    defaultValue={new Date(selectedProject.startDate).toISOString().substr(0, 10)}
                    fullWidth
                    required
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="endDate"
                    label="End Date"
                    type="date"
                    variant="outlined"
                    defaultValue={new Date(selectedProject.endDate).toISOString().substr(0, 10)}
                    fullWidth
                    required
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      name="status"
                      defaultValue={selectedProject.status}
                      required
                    >
                      <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="in-progress">In Progress</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="canceled">Canceld</MenuItem>
            <MenuItem value="assigned">Assigned</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditClose} color="secondary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Dialog open={openDelete} onClose={handleDeleteClose}>
        <DialogTitle>Delete Project</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this project?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleDelete(selectedProject._id)} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

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

export default Projects;
