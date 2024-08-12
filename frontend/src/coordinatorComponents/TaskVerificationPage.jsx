import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Button, Card, CardContent, CardMedia, CircularProgress } from '@mui/material';

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
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (error) {
      setError('Failed to update task');
      console.error(error);
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box padding={2}>
      <Typography variant="h4" gutterBottom>Task Verification</Typography>
      {tasks.length === 0 ? (
        <Typography>No tasks pending verification</Typography>
      ) : (
        tasks.map(task => (
          <Card key={task._id} sx={{ marginBottom: 2 }}>
            <CardContent>
              <Typography variant="h6">{task.description}</Typography>
              <Typography variant="body2">Location: {task.startLocation.lat}, {task.startLocation.lng} to {task.endLocation.lat}, {task.endLocation.lng}</Typography>
              <Box>
                {task.photos.length > 0 ? (
                  task.photos.map(photo => (
                    <img key={photo} src={`http://localhost:3000${photo}`} alt="Task Photo" style={{ width: '200px', height: 'auto' }} />

                  ))
                ) : (
                  <Typography>No photos available</Typography>
                )}
              </Box>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleVerifyTask(task._id)}
              >
                Mark as Completed
              </Button>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default TaskVerificationPage;
