// components/Projects.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Alert,
} from '@mui/material';
import { FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { getProjects, editProject, removeProject } from '../redux/projectsSlice';

const Track = () => {
  const dispatch = useDispatch();
  const { projects, loading, error } = useSelector((state) => state.projects);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

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

  // Map projects to include the number of days
  const filteredProjects = projects
    .filter((project) =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .map((project) => {
      const startDate = new Date(project.startDate);
      const endDate = new Date(project.endDate);
      const days = Math.round((endDate - startDate) / (1000 * 3600 * 24));
      return {
        ...project,
        days, // Add the days field
      };
    });

  const columns = [
    { field: 'title', headerName: 'Project Title', width: 200 },
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
    { field: 'days', headerName: 'number Days', width: 150 }, // Use 'days' field here
    { field: 'status', headerName: 'progress', width: 150 },
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
    </Box>
  );
};

export default Track;
