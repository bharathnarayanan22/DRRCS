import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, List, ListItem, ListItemText, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField, ListItemAvatar, Avatar } from '@mui/material';
import { styled } from '@mui/system';

const StyledContainer = styled(Container)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  boxShadow: theme.shadows[1],
}));

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/task/acceptedTasks', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        });
        setTasks(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleComplete = (task) => {
    setSelectedTask(task);
    setOpenDialog(true);
  };

  const handlePhotoChange = (event) => {
    setPhotos(event.target.files);
  };

  const handleUploadPhotos = async () => {
    const formData = new FormData();
    Array.from(photos).forEach(file => formData.append('photos', file));
    formData.append('taskId', selectedTask._id);

    try {
      await axios.post('http://localhost:3000/task/uploadPhotos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });
      setOpenDialog(false);
      setTasks(tasks.map(task => task._id === selectedTask._id ? { ...task, status: 'pending-verification' } : task));
    } catch (error) {
      console.error('Error uploading photos:', error);
    }
  };

  const handleGetDirections = (startLocation, endLocation) => {
    const url = `https://www.google.com/maps/dir/?api=1&origin=${startLocation.lat},${startLocation.lng}&destination=${endLocation.lat},${endLocation.lng}&travelmode=driving`;
    window.open(url, '_blank');
  };

  return (
    <StyledContainer>
      <Typography variant="h4" gutterBottom>
        My Tasks
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <List>
          {tasks.map(task => (
            <StyledListItem key={task._id}>
              <ListItemAvatar>
                {task.photos.length > 0 && (
                  <Avatar
                    src={`http://localhost:3000${task.photos[0]}`} 
                    alt="Task thumbnail"
                  />
                )}
              </ListItemAvatar>
              <ListItemText
                primary={task.description}
                secondary={`Status: ${task.status}`}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleComplete(task)}
                disabled={task.status === 'completed' || task.status === 'pending-verification'}
              >
                Mark as Completed
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleGetDirections(task.startLocation, task.endLocation)}
                style={{ marginLeft: 10 }}
              >
                See Directions
              </Button>
            </StyledListItem>
          ))}
        </List>
      )}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Upload Photos for Task Completion</DialogTitle>
        <DialogContent>
          <input
            type="file"
            multiple
            onChange={handlePhotoChange}
            style={{ display: 'block', marginBottom: '16px' }}
          />
          <Typography variant="body1">Please upload photos of task completion:</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUploadPhotos} color="primary">
            Upload Photos
          </Button>
        </DialogActions>
      </Dialog>
    </StyledContainer>
  );
};

export default MyTasks;
