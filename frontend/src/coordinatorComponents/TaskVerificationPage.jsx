import React, { useState, useEffect } from 'react';
import axios from "../helpers/auth-config";
import { Box, Typography, Button, Card, CardContent, CardMedia, CircularProgress, Grid } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TaskVerificationPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/task/pendingVerification', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        setTasks(response.data);
      } catch (error) {
        setError('Failed to fetch tasks');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleVerifyTask = async (taskId) => {
    try {
      await axios.put(`http://localhost:3000/task/updateTaskStatus/${taskId}`, {}, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } 
      });
      toast.success('Task Verification Successful');
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (error) {
      toast.error('Task Verification Failed');
      setError('Failed to update task');
      console.error(error);
    }
  };

  const redirectToGoogleMaps = (startLocation, endLocation) => {
    const startCoords = `${startLocation.lat},${startLocation.lng}`;
    const endCoords = `${endLocation.lat},${endLocation.lng}`;
    const gmapUrl = `https://www.google.com/maps/dir/?api=1&origin=${startCoords}&destination=${endCoords}&travelmode=driving`;
    window.open(gmapUrl, '_blank');
  };

  if (loading) return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Box>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box padding={2}>
      <ToastContainer />
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ 
          fontFamily: 'Playfair Display', 
          fontStyle: 'italic', 
          fontWeight: 900, 
          color: "#444",
          
        }}>
        Task Verification
      </Typography>

      {tasks.length === 0 ? (
        <Typography sx={{ color: '#777' }}>No tasks pending verification</Typography>
      ) : (
        <Grid container spacing={2}>
          {tasks.map(task => (
            <Grid item xs={12} md={6} key={task._id}>
              <Card sx={{ boxShadow: 3, width:"60%" }}>
                {task.photos.length > 0 ? (
                  <CardMedia
                    component="img"
                    alt="Task Photo"
                    height="200"
                    image={`http://localhost:3000${task.photos[0]}`} 
                  />
                ) : (
                  <Typography sx={{ textAlign: 'center', padding: 2 }}>No photos available</Typography>
                )}
                <CardContent>
                  <Typography variant="h6" gutterBottom>{task.description}</Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => redirectToGoogleMaps(task.startLocation, task.endLocation)}
                    sx={{ mb: 2 }}
                  >
                    View Location on Google Maps
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleVerifyTask(task._id)}
                  >
                    Mark as Completed
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default TaskVerificationPage;
