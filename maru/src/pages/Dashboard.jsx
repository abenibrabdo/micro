import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [statusCounts, setStatusCounts] = useState({
    approved: 0,
    pending: 0,
    canceled: 0,
    assigned: 0,
    completed: 0,
    inProgress: 0,
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/projects/');
        const data = await response.json();
        setProjects(data);

        // Count statuses
        const counts = {
          approved: 0,
          pending: 0,
          canceled: 0,
          assigned: 0,
          completed: 0,
          inProgress: 0,
        };

        data.forEach(project => {
          switch (project.status) {
            case 'approved':
              counts.approved++;
              break;
            case 'pending':
              counts.pending++;
              break;
            case 'canceled':
              counts.canceled++;
              break;
            case 'assigned':
              counts.assigned++;
              break;
            case 'completed':
              counts.completed++;
              break;
            case 'in-progress':
              counts.inProgress++;
              break;
            default:
              break;
          }
        });

        setStatusCounts(counts);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div>
      <Typography variant="h1">.</Typography>
      <Typography variant="h2">Project Dashboard</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ backgroundColor: '#4caf50', color: '#fff' }}>
            <CardContent>
              <Typography variant="h6">Approved Projects</Typography>
              <Typography variant="h4">{statusCounts.approved}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ backgroundColor: '#ff9800', color: '#fff' }}>
            <CardContent>
              <Typography variant="h6">Pending Projects</Typography>
              <Typography variant="h4">{statusCounts.pending}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ backgroundColor: '#f44336', color: '#fff' }}>
            <CardContent>
              <Typography variant="h6">Canceled Projects</Typography>
              <Typography variant="h4">{statusCounts.canceled}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ backgroundColor: '#2196f3', color: '#fff' }}>
            <CardContent>
              <Typography variant="h6">Assigned Projects</Typography>
              <Typography variant="h4">{statusCounts.assigned}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ backgroundColor: '#8bc34a', color: '#fff' }}>
            <CardContent>
              <Typography variant="h6">Completed Projects</Typography>
              <Typography variant="h4">{statusCounts.completed}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ backgroundColor: '#ffeb3b', color: '#000' }}>
            <CardContent>
              <Typography variant="h6">In-Progress Projects</Typography>
              <Typography variant="h4">{statusCounts.inProgress}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Typography variant="h3" sx={{ marginTop: 4 }}>Project Statistics:</Typography>
      <Grid container spacing={2}>
        {projects.map(project => (
          <Grid item xs={12} sm={6} md={4} key={project._id}>
            <Card sx={{ backgroundColor: '#e0e0e0' }}>
              <CardContent>
                <Typography variant="h6">{project.title}</Typography>
                <Typography color="textSecondary">
                  Status: <strong>{project.status}</strong>
                </Typography>
                <Typography>
                  Assigned Stakeholders: {project.assignedUsers.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Dashboard;
