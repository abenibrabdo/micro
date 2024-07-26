import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProject } from '../redux/projectsSlice';
import { fetchUsers } from '../redux/userSlice';
import {
  TextField,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  Container,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
  Checkbox,
  ListItemText,
  DialogTitle,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const initialState = {
  title: '',
  budget: '',
  resource: '',
  locationLat: '',
  locationLong: '',
  description: '',
  startDate: '',
  endDate: '',
  status: 'pending',
  assignedUsers: []
};

const CustomTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '& label.Mui-focused': {
    color: theme.palette.primary.main,
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: theme.palette.primary.main,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.primary.light,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const AddProject = () => {
  const [formState, setFormState] = useState(initialState);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.projects);
  const { users = [], loading: usersLoading, error: usersError } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleAssignedUsersChange = (event) => {
    setFormState({ ...formState, assignedUsers: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addProject(formState))
      .unwrap()
      .then(() => {
        setSnackbarMessage('Project added successfully!');
        setSnackbarSeverity('success');
        setFormState(initialState); // Reset the form
      })
      .catch((error) => {
        console.error('Error adding project:', error);
        setSnackbarMessage('Failed to add project.');
        setSnackbarSeverity('error');
      })
      .finally(() => {
        setOpenSnackbar(true);
      });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  if (usersLoading) {
    return <CircularProgress />;
  }

  if (usersError) {
    return <div>Error loading users: {usersError}</div>;
  }

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
      <DialogTitle>Fill New Project Information</DialogTitle>
        <CustomTextField
          label="Title"
          name="title"
          variant="outlined"
          fullWidth
          value={formState.title}
          onChange={handleInputChange}
          required
        />
        <CustomTextField
          label="Budget"
          name="budget"
          variant="outlined"
          fullWidth
          type="number"
          value={formState.budget}
          onChange={handleInputChange}
          required
        />
        <CustomTextField
          label="Resource"
          name="resource"
          variant="outlined"
          fullWidth
          value={formState.resource}
          onChange={handleInputChange}
          required
        />
        <CustomTextField
          label="Latitude"
          name="locationLat"
          variant="outlined"
          fullWidth
          type="number"
          value={formState.locationLat}
          onChange={handleInputChange}
          required
        />
        <CustomTextField
          label="Longitude"
          name="locationLong"
          variant="outlined"
          fullWidth
          type="number"
          value={formState.locationLong}
          onChange={handleInputChange}
          required
        />
        <CustomTextField
          label="Description"
          name="description"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={formState.description}
          onChange={handleInputChange}
          required
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={formState.status}
            onChange={handleInputChange}
            label="Status"
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="in-progress">In Progress</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="canceled">Canceled</MenuItem>
            <MenuItem value="assigned">Assigned</MenuItem>
          </Select>
        </FormControl>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              label="Start Date"
              name="startDate"
              type="date"
              variant="outlined"
              fullWidth
              value={formState.startDate}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              label="End Date"
              name="endDate"
              type="date"
              variant="outlined"
              fullWidth
              value={formState.endDate}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
        </Grid>
        <FormControl fullWidth margin="normal">
          <InputLabel>Assigned Stackholders</InputLabel>
          <Select
            multiple
            name="assignedUsers"
            value={formState.assignedUsers}
            onChange={handleAssignedUsersChange}
            renderValue={(selected) => selected.map(id => users.find(user => user._id === id)?.username).join(', ')}
          >
            {users.map((user) => (
              <MenuItem key={user._id} value={user._id}>
                <Checkbox checked={formState.assignedUsers.indexOf(user._id) > -1} />
                <ListItemText primary={user.username} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: '1rem' }}
          disabled={loading || usersLoading}
        >
          {loading || usersLoading ? <CircularProgress size={24} /> : 'Add Project'}
        </Button>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AddProject;
