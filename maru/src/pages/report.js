import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Typography,
  CircularProgress,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { jsPDF } from 'jspdf';
import { getProjects } from '../redux/projectsSlice';

const ReportGenerator = () => {
  const dispatch = useDispatch();
  const { projects, loading, error } = useSelector((state) => state.projects);
  const [searchQuery, setSearchQuery] = useState('');
  const [status, setStatus] = useState('');
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  useEffect(() => {
    const filtered = projects.filter((project) =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (status === '' || project.status === status)
    );
    setFilteredProjects(filtered);
  }, [projects, searchQuery, status]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    let y = 10;

    filteredProjects.forEach((project, index) => {
      doc.text(`Project ${index + 1}:`, 10, y);
      doc.text(`Title: ${project.title}`, 10, y + 10);
      doc.text(`Status: ${project.status}`, 10, y + 20);
      doc.text(`Budget: ${project.budget}`, 10, y + 30);
      doc.text(`Description: ${project.description}`, 10, y + 40);
      doc.text(`Start Date: ${new Date(project.startDate).toLocaleDateString()}`, 10, y + 50);
      doc.text(`End Date: ${new Date(project.endDate).toLocaleDateString()}`, 10, y + 60);
      y += 70;
    });

    doc.save('projects.pdf');
  };

  const columns = [
    { field: 'title', headerName: 'Project Title', width: 200 },
    { field: 'budget', headerName: 'Project Budget', width: 150 },
    { field: 'resource', headerName: 'Resource', width: 200 },
    { field: 'startDate', headerName: 'Start Date', width: 200 },
    { field: 'endDate', headerName: 'End Date', width: 200 },
    { field: 'status', headerName: 'Status', width: 150 },
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
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <Typography variant="h4" color="primary">Projects</Typography>
        <Button variant="contained" color="primary" onClick={handleGeneratePDF}>
          Generate PDF
        </Button>
      </Box>

      <Box sx={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
        <TextField
          label="Search Projects"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={handleSearch}
        />

        <FormControl variant="outlined" fullWidth sx={{
          backgroundColor: '#e3f2fd',
          borderRadius: '4px',
          '& .MuiInputLabel-root': {
            color: '#1e88e5',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#1e88e5',
            },
            '&:hover fieldset': {
              borderColor: '#1565c0',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#0d47a1',
            },
          },
          '& .MuiSelect-select': {
            color: '#1e88e5',
          }
        }}>
          <InputLabel>Status</InputLabel>
          <Select value={status} onChange={handleStatusChange} label="Status">
            <MenuItem value="">All</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="in-progress">In Progress</MenuItem>
            <MenuItem value="canceled">Canceled</MenuItem>
            <MenuItem value="approved">Approved</MenuItem>
            <MenuItem value="assigned">Assigned</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <DataGrid
        rows={filteredProjects}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5, 10, 20]}
        checkboxSelection
        disableSelectionOnClick
        autoHeight
        getRowId={(row) => row._id}
        sx={{
          '& .MuiDataGrid-cell': {
            backgroundColor: '#f5f5f5',
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#1976d2',
            color: '#fff',
          },
          '& .MuiDataGrid-footerContainer': {
            backgroundColor: '#1976d2',
            color: '#fff',
          },
        }}
      />

      <Snackbar
        open={Boolean(error)}
        autoHideDuration={6000}
        onClose={() => { /* Handle Snackbar close logic if needed */ }}
      >
        <Alert onClose={() => { /* Handle Snackbar close logic if needed */ }} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ReportGenerator;
