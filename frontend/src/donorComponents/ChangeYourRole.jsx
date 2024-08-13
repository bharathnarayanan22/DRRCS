import React, { useState } from 'react';
import { Button, Container, Typography, Box, CircularProgress, Card, CardContent, CardMedia } from '@mui/material';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import axios from '../helpers/auth-config';
import 'react-toastify/dist/ReactToastify.css';

const ChangeYourRole = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const token = useSelector((state) => state.user.token);

  const changeToVolunteer = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/change-role/volunteer', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await toast.success("You are Volunteer Now");
      setMessage(response.data.message);
      setLoading(false);
    } catch (error) {
      toast.error('Role Conversion Failure');
      setMessage('Error changing role');
      setLoading(false);
    }
  };

  const requestCoordinatorRole = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/change-role/request-coordinator', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await toast.success("Request Sent To the Coordinator");
      setMessage(response.data.message);
      setLoading(false);
    } catch (error) {
      toast.error('Request Failed');
      setMessage('Error requesting coordinator role');
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '500px' }}>
      <ToastContainer />
      <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '100%', gap : 20 }}>
        
        <Card sx={{ width: "50%", textAlign: 'center', boxShadow: 5, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
          <CardMedia
            component="img"
            alt="Volunteer Image"
            height="200"
            image="src/assets/volunteer.jpg"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Become a Volunteer
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={changeToVolunteer} 
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Change to Volunteer'}
            </Button>
          </CardContent>
        </Card>

        <Card sx={{ width:"51%", textAlign: 'center', boxShadow: 5, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
          <CardMedia
            component="img"
            alt="Coordinator Image"
            height="200"
            image="src/assets/coordinator.jpg"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Request Coordinator Role
            </Typography>
            <Button 
              variant="contained" 
              color="secondary" 
              onClick={requestCoordinatorRole} 
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Request Role'}
            </Button>
          </CardContent>
        </Card>

      </Box>
    </Container>
  );
};

export default ChangeYourRole;
