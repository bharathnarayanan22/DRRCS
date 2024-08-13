import React, { useState, useEffect } from 'react';
import axios from "../helpers/auth-config";
import { Box, Typography, Card, CardContent, CircularProgress, Grid, Avatar } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const UserProfilePage = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/userProfile/${userId}`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        setUser(response.data.user);
        setStats(response.data.stats);
      } catch (error) {
        setError('Failed to fetch user profile');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  if (loading) return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <CircularProgress />
    </Box>
  );
  
  if (error) return <Typography color="error">{error}</Typography>;

  const data = [
    { name: 'Tasks', value: stats?.taskCount || 0 },
    { name: 'Responses', value: stats?.responseCount || 0 },
    { name: 'Resources', value: stats?.resourceCount || 0 },
  ];

  return (
    <Box padding={1} maxWidth="900px" >
      <Card sx={{ boxShadow: 5 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4} display="flex" justifyContent="center" alignItems="center">
              <Avatar
                alt={user?.name}
                src="/static/images/avatar/1.jpg" 
                sx={{ width: 120, height: 120, fontSize: 40, backgroundColor: "#444" }}
              >
                {user?.name.charAt(0)}
              </Avatar>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Roboto Slab', fontWeight: 700 }}>
                {user?.name}
              </Typography>
              <Typography variant="body1" sx={{ fontFamily: 'Roboto', color: "#555" }}>
                Email: {user?.email}
              </Typography>
              <Typography variant="body1" sx={{ fontFamily: 'Roboto', color: "#555" }}>
                Role: {user?.role}
              </Typography>
            </Grid>
          </Grid>

          <Box mt={4}>
            <Typography variant="h5" gutterBottom sx={{ fontFamily: 'Roboto Slab', fontWeight: 600 }}>
              User Statistics
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  fill="#8884d8"
                  label
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#8884d8', '#83a6ed', '#8dd1e1'][index]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserProfilePage;
