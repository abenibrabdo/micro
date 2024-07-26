// src/components/UserList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../redux/userSlice';
import { Container, Typography, Card, CardContent, Grid, CircularProgress, Paper, Avatar } from '@mui/material';
import { styled } from '@mui/system';

// Styled components
const StyledCard = styled(Card)({
  marginBottom: '20px',
  borderRadius: '15px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
  background: 'linear-gradient(145deg, #f5f7fa, #c3cfe2)',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
  },
});

const StyledPaper = styled(Paper)({
  background: 'rgba(255, 255, 255, 0.9)',
  padding: '15px',
  marginTop: '10px',
  borderRadius: '10px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
});

const UserAvatar = styled(Avatar)({
  width: '60px',
  height: '60px',
  margin: '0 auto 10px',
  backgroundColor: '#2196F3',
});

const UserList = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) return <CircularProgress color="primary" />;
  if (error) return <Typography color="error">Error loading users: {error}</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom align="center">
        User List
      </Typography>
      <Grid container spacing={3}>
        {users.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user._id}>
            <StyledCard>
              <CardContent>
                <UserAvatar>{user.username.charAt(0).toUpperCase()}</UserAvatar>
                <Typography variant="h5" component="div" color="primary" align="center">
                  {user.username}
                </Typography>
                <Typography variant="body1" align="center" color="textSecondary">
                  Email: {user.email}
                </Typography>
                <Typography variant="body2" align="center" color="textSecondary">
                  Role: {user.role}
                </Typography>
                {user.assignedProjects.length > 0 ? (
                  <StyledPaper elevation={3}>
                    <Typography variant="h6" component="div" color="secondary" gutterBottom>
                      Assigned Projects
                    </Typography>
                    {user.assignedProjects.map((project) => (
                      <div key={project._id}>
                        <Typography variant="body2" color="textPrimary">
                          <strong>Title:</strong> {project.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          <strong>Status:</strong> {project.status}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          <strong>Start Date:</strong> {new Date(project.startDate).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          <strong>End Date:</strong> {new Date(project.endDate).toLocaleDateString()}
                        </Typography>
                        <hr />
                      </div>
                    ))}
                  </StyledPaper>
                ) : (
                  <Typography variant="body2" color="textSecondary" align="center">
                    No assigned projects
                  </Typography>
                )}
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default UserList;
