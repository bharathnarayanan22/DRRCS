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

  const changeToDonor = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/change-role/donor', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await toast.success("You are a Donor Now");
      setMessage(response.data.message);
      setLoading(false);
    } catch (error) {
      await toast.error("Failed to change role");
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
      await toast.success("Request Sent to become Coordinator Successfully");
      setMessage(response.data.message);
      setLoading(false);
    } catch (error) {
      await toast.error("Failed to send request");
      setMessage('Error requesting coordinator role');
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '550px' }}>
      <ToastContainer />
      <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '100%' , gap: 20}}>
        
        <Card sx={{ width: "50%", textAlign: 'center', boxShadow: 5, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
          <CardMedia
            component="img"
            alt="Donor Image"
            height="200"
            image="src/assets/donor.jpg"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Become a Donor
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={changeToDonor} 
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Change to Donor'}
            </Button>
          </CardContent>
        </Card>

        <Card sx={{ width: "50%", textAlign: 'center', boxShadow: 5, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
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
