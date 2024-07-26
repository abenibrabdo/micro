// redux/projectsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/projects/';

const API_URL2 = 'http://localhost:3001/api/users/assign';

export const getProjects = createAsyncThunk('projects/getProjects', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const assignProjectToUser = createAsyncThunk(
  'projects/assignProjectToUser',
  async ({ userId, projectId }, thunkAPI) => {
    try {
      const response = await axios.post(`http://localhost:3001/api/users/assign/${userId}/${projectId}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


export const addProject = createAsyncThunk('projects/addProject', async (project, { rejectWithValue }) => {
  try {
    const response = await axios.post(API_URL, project, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const editProject = createAsyncThunk('projects/editProject', async ({ id, updatedProject }) => {
  const response = await axios.put(`${API_URL}${id}`, updatedProject);
  return response.data;
});

export const removeProject = createAsyncThunk('projects/removeProject', async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${API_URL}${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    projects: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        state.projects = action.payload;
        state.loading = false;
      })
      .addCase(getProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.projects.push(action.payload);
        state.loading = false;
      })
      .addCase(addProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editProject.fulfilled, (state, action) => {
        const index = state.projects.findIndex((project) => project._id === action.payload._id);
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(editProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter((project) => project._id !== action.payload);
        state.loading = false;
      })
      .addCase(removeProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(assignProjectToUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(assignProjectToUser.fulfilled, (state, action) => {
        state.loading = false;
        // Handle any additional logic if needed
      })
      .addCase(assignProjectToUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default projectsSlice.reducer;
