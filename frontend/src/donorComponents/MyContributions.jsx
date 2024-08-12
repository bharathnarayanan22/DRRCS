import React, { useEffect, useState } from 'react';
import axios from '../helpers/auth-config';
import { Container, Typography, List, ListItem, ListItemText, CircularProgress, Box } from '@mui/material';
import { useSelector } from 'react-redux';

const MyContributions = () => {
  const [resources, setResources] = useState([]);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch resources
        const resourceResponse = await axios.get('http://localhost:3000/resource/myResources', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setResources(resourceResponse.data);

        // Fetch responses
        const responseResponse = await axios.get('http://localhost:3000/response/myResponses', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(responseResponse.data)
        setResponses(responseResponse.data);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Playfair Display', fontStyle: 'italic', fontWeight:900, color:"#444" }}>
        My Contributions
      </Typography>
      
      <Box mb={4}>
        <Typography variant="h5" gutterBottom >
          My Resources
        </Typography>
        <List>
          {resources.length === 0 ? (
            <ListItem>
              <ListItemText primary="No resources found." />
            </ListItem>
          ) : (
            resources.map((resource) => (
              <ListItem key={resource._id}>
                <ListItemText
                  primary={`Type: ${resource.type}`}
                  secondary={`Quantity: ${resource.quantity}, Status: ${resource.status}`}
                />
              </ListItem>
            ))
          )}
        </List>
      </Box>

      <Box>
        <Typography variant="h5" gutterBottom>
          My Responses
        </Typography>
        <List>
          {responses.length === 0 ? (
            <ListItem>
              <ListItemText primary="No responses found." />
            </ListItem>
          ) : (
            responses.map((response) => (
              <ListItem key={response._id}>
                <ListItemText
                  primary={`Response: ${response.resource.type}`}
                  secondary={`Quantity: ${response.resource.quantity},Message: ${response.message}`}
                />
              </ListItem>
            ))
          )}
        </List>
      </Box>
    </Container>
  );
};

export default MyContributions;
