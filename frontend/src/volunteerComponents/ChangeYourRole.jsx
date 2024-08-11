import React, { useState } from 'react';
import { Button, Container, Typography, Box, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';

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
      setMessage(response.data.message);
      setLoading(false);
    } catch (error) {
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
      setMessage(response.data.message);
      setLoading(false);
    } catch (error) {
      setMessage('Error requesting coordinator role');
      setLoading(false);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Change Your Role
      </Typography>

      <Box mb={2}>
        <Button variant="contained" color="primary" onClick={changeToDonor} disabled={loading}>
          Change to Donor
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
