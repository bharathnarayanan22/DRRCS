import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, List, ListItem, ListItemText, Button, CircularProgress } from '@mui/material';
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

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/task/acceptedTasks', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        });
        console.log(response)
        setTasks(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleComplete = async (taskId) => {
    console.log(taskId)
    try {
      await axios.put(`http://localhost:3000/task/updateTaskStatus/${taskId}`, { status: 'completed' },{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });
      setTasks(tasks.map(task => task._id === taskId ? { ...task, status: 'completed' } : task));
    } catch (error) {
      console.error('Error updating task status:', error);
    }
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
              <ListItemText
                primary={task.description}
                secondary={`Status: ${task.status}`}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleComplete(task._id)}
                disabled={task.status === 'completed'}
              >
                Mark as Completed
              </Button>
            </StyledListItem>
          ))}
        </List>
      )}
    </StyledContainer>
  );
};

export default MyTasks;
