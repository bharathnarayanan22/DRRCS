import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import axios from '../helpers/auth-config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditResource = ({ resource, onUpdate }) => {
  const [type, setType] = useState(resource.type);
  const [quantity, setQuantity] = useState(resource.quantity);
  //const [location, setLocation] = useState(resource.location);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpdateResource = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(`http://localhost:3000/resource/updateResource/${id}`, {
        type,
        quantity,
        location,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        onUpdate(response.data);
        console.log('Resource updated successfully');
      } else {
        throw new Error('Failed to update resource');
      }
    } catch (error) {
      console.error('Error updating resource:', error);
      setError('Failed to update resource');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box mt={2}>
      <Typography variant="h5" gutterBottom sx={{ fontFamily: 'Playfair Display', fontStyle: 'italic', fontWeight:900, color:"#444" }}>
        Edit Resource
      </Typography>
      <TextField
        label="Type"
        variant="outlined"
        fullWidth
        value={type}
        onChange={(e) => setType(e.target.value)}
        margin="normal"
        required
      />
      <TextField
        label="Quantity"
        variant="outlined"
        fullWidth
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        margin="normal"
        required
      />
      {error && <Typography color="error">{error}</Typography>}
      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpdateResource}
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Resource'}
        </Button>
      </Box>
    </Box>
  );
};

export default EditResource;
