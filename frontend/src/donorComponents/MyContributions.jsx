import React, { useEffect, useState } from 'react';
import axios from '../helpers/auth-config';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Box,
  Paper,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        console.log(responseResponse.data);
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
    return (
      <Box>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container>
      <Paper
        elevation={8}
        sx={{
          padding: 4,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: 3,
          backdropFilter: 'blur(5px)',
        }}
      >
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontFamily: 'Playfair Display, serif',
            fontStyle: 'italic',
            fontWeight: 700,
            color: '#333',
            textAlign: 'center',
            marginBottom: 4,
          }}
        >
          My Contributions
        </Typography>

        <Box mb={6}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontFamily: 'Lora, serif',
              fontWeight: 600,
              color: '#444',
              marginBottom: 2,
            }}
          >
            My Resources
          </Typography>
          <List>
            {resources.length === 0 ? (
              <ListItem>
                <ListItemText
                  primary="No resources found."
                  primaryTypographyProps={{
                    sx: { fontFamily: 'Lora, serif', fontSize: '18px', color: '#666' },
                  }}
                />
              </ListItem>
            ) : (
              resources.map((resource) => (
                <ListItem key={resource._id} sx={{ backgroundColor: '#f5f5f5', borderRadius: 2, mb: 2 }}>
                  <ListItemText
                    primary={`Type: ${resource.type}`}
                    secondary={`Quantity: ${resource.quantity}, Status: ${resource.status}`}
                    primaryTypographyProps={{
                      sx: { fontFamily: 'Lora, serif', fontSize: '20px', fontWeight: 'bold' },
                    }}
                    secondaryTypographyProps={{
                      sx: { fontFamily: 'Lora, serif', fontSize: '16px', color: '#888' },
                    }}
                  />
                </ListItem>
              ))
            )}
          </List>
        </Box>

        <Box>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontFamily: 'Lora, serif',
              fontWeight: 600,
              color: '#444',
              marginBottom: 2,
            }}
          >
            My Responses
          </Typography>
          <List>
            {responses.length === 0 ? (
              <ListItem>
                <ListItemText
                  primary="No responses found."
                  primaryTypographyProps={{
                    sx: { fontFamily: 'Lora, serif', fontSize: '18px', color: '#666' },
                  }}
                />
              </ListItem>
            ) : (
              responses.map((response) => (
                <ListItem key={response._id} sx={{ backgroundColor: '#f5f5f5', borderRadius: 2, mb: 2 }}>
                  <ListItemText
                    primary={`Response: ${response.resource.type}`}
                    secondary={`Quantity: ${response.resource.quantity}, Message: ${response.message}`}
                    primaryTypographyProps={{
                      sx: { fontFamily: 'Lora, serif', fontSize: '20px', fontWeight: 'bold' },
                    }}
                    secondaryTypographyProps={{
                      sx: { fontFamily: 'Lora, serif', fontSize: '16px', color: '#888' },
                    }}
                  />
                </ListItem>
              ))
            )}
          </List>
        </Box>
      </Paper>
      <ToastContainer />
    </Container>
  );
};

export default MyContributions;
