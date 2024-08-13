import React, { useState, useEffect } from 'react';
import axios from "../helpers/auth-config";
import { Box, Typography, Card, CardContent, CircularProgress } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

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

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  const data = [
    { name: 'Tasks', value: stats.taskCount },
    { name: 'Responses', value: stats.responseCount },
    { name: 'Resources', value: stats.resourceCount },
  ];

  return (
    <Box padding={2}>
      <Typography variant="h4" gutterBottom>User Profile</Typography>
      <Card>
        <CardContent>
          <Typography variant="h6">{user.name}</Typography>
          <Typography variant="body1">Email: {user.email}</Typography>
          <Typography variant="body1">Role: {user.role}</Typography>

          <Typography variant="h6" gutterBottom>Statistics</Typography>
          <PieChart width={400} height={400}>
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
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserProfilePage;
