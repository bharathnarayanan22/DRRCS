import React, { useState } from 'react';
import { Button, Container, Typography, Box, CircularProgress } from '@mui/material';
import axios from '../helpers/auth-config';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
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
      await toast.success("You are Volunteer Now")
      setMessage(response.data.message);
      setLoading(false);
    } catch (error) {
      toast.error('Role Conversion Failure')
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
      await toast.success("Request Sent To the Coordinator")
      setMessage(response.data.message);
      
      setLoading(false);
    } catch (error) {
      toast.error('Request Failed')
      setMessage('Error requesting coordinator role');
      setLoading(false);
    }
  };

  return (
    <Container>
      <ToastContainer/>
      <Typography variant="h4" gutterBottom>
        Change Your Role
      </Typography>

      <Box mb={2}>
        <Button variant="contained" color="primary" onClick={changeToVolunteer} disabled={loading}>
          Change to Volunteer
        </Button>
      </Box>

      <Box mb={2}>
        <Button variant="contained" color="secondary" onClick={requestCoordinatorRole} disabled={loading}>
          Request Coordinator Role
        </Button>
      </Box>

      {loading && <CircularProgress />}
      {message && <Typography variant="body1">{message}</Typography>}
    </Container>
  );
};

export default ChangeYourRole;
